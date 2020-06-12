const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");

/**
 * Assertion style
 */

const expect = chai.expect;
chai.use(chaiHttp);

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
