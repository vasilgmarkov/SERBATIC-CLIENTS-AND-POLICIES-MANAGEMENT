const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const { getClients } = require("../services/services.js");
/**
 * Assertion style
 */

const expect = chai.expect;
chai.use(chaiHttp);

/**
 * TEST USER API
 */
describe("User /api/user", () => {
  /**
   * Test the POST route
   */
  describe("POST /api/user/login", () => {
    it("It should login the user", (done) => {
      //mock user input
      const user = {
        email: "manningblankenship@quotezart.com",
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(200);
          expect(response.body.token).to.exist;
          tokenS = response.body.token;
          expect(response.body.msg).to.be.equal("Authentication done");
          done();
        });
    });

    it("It should NOT login the user (empty email)", (done) => {
      //mock user input
      const user = {
        email: "",
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(400);
          expect(response.body.msg).to.be.equal("The email is required!");
          done();
        });
    });

    it("It should NOT login the user (no user found)", (done) => {
      //mock user input
      const user = {
        email: "1@1.com",
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(404);
          expect(response.body.msg).to.be.equal("The user does not exist");
          done();
        });
    });
  });
  /**
   * Test the GET auth route
   */
  describe("GET /api/user/profile", () => {
    it("It should get the logged user", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("access-token", tokenS)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body)
            .to.have.property("id")
            .eq("e8fd159b-57c4-4d36-9bd7-a59ca13057bb");
          done();
        });
    });

    it("It should NOT get the logged user(invalid token)", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("access-token", tokenS + "s")
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(401);
          expect(response.body.msg).to.be.equal("Invalid Token.");
          done();
        });
    });

    it("It should NOT get the logged user(no token)", (done) => {
      chai
        .request(server)
        .get("/api/user/profile")
        .set("access-token", "")
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(400);
          expect(response.body.msg).to.be.equal("Token not provided.");
          done();
        });
    });
  });
});
/**
 * TEST CLIENTS API
 */
describe("Clients /api/clients", () => {
  /**
   * Test the client source url
   */
  describe("Fetch data from the clients url", () => {
    it("It should return array", async () => {
      var result = await getClients(
        "http://www.mocky.io/v2/5808862710000087232b75ac"
      );
      expect(result).to.be.an("Array");
    });
    it("It should NOT return array", async () => {
      var result = await getClients(
        "http://www.mocky.io/v2/5808862710000087232b75acb"
      );
      expect(result).to.be.an("object");
      expect(result.err.response).to.have.status(404);
      expect(result.err.response.statusText).to.be.equal("Not Found");
    });
  });
  /**
   * Test the GET auth route by :/id
   */
  describe("GET /api/clients/:id", () => {
    it("It should get the client based on the client id", (done) => {
      const clientId = "a74c83c5-e271-4ecf-a429-d47af952cfd4";
      chai
        .request(server)
        .get(`/api/clients/${clientId}`)
        .set("access-token", tokenS)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body)
            .to.have.property("id")
            .eq("a74c83c5-e271-4ecf-a429-d47af952cfd4");
          done();
        });
    });

    it("It should NOT get the client based on the client id", (done) => {
      const clientId = "1234";
      chai
        .request(server)
        .get(`/api/clients/${clientId}`)
        .set("access-token", tokenS)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(404);
          expect(response.body).to.be.a("object");
          expect(response.body.msg).to.be.equal("No client found");
          done();
        });
    });
  });
  /**
   * Test the GET auth route by /name:/name
   */
  describe("GET /api/clients/name/:name", () => {
    it("It should get the client based on the client name", (done) => {
      const clientName = "Whitley";
      chai
        .request(server)
        .get(`/api/clients/name/${clientName}`)
        .set("access-token", tokenS)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body)
            .to.have.property("id")
            .eq("0178914c-548b-4a4c-b918-47d6a391530c");
          expect(response.body).to.have.property("name").eq(clientName);
          done();
        });
    });

    it("It should NOT get the client based on the client name", (done) => {
      const clientName = "Vasil";
      chai
        .request(server)
        .get(`/api/clients/${clientName}`)
        .set("access-token", tokenS)
        .end((err, response) => {
          //assertions
          expect(response).to.have.status(404);
          expect(response.body).to.be.a("object");
          expect(response.body.msg).to.be.equal("No client found");
          done();
        });
    });
  });
});
