# SERBATIC CLIENTS AND POLICIES MANAGEMENT

An application that manages some information regarding insurance policies and company clients.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.18.0

    $ npm --version
    6.14.4

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/vasilgmarkov/SERBATIC-CLIENTS-AND-POLICIES-MANAGEMENT.git
    $ cd SERBATIC-CLIENTS-AND-POLICIES-MANAGEMENT
    $ npm install

## Configure app

Create `.env` file and then insert:

- JWT_SECRET = your secret phrase;
- CLIENT_URL = http://www.mocky.io/v2/5808862710000087232b75ac
- POLICIES_URL = http://www.mocky.io/v2/580891a4100000e8242b75c5

## APIs

Check the routes in the [link](https://documenter.getpostman.com/view/3529957/Szzhfysn?version=latest#intro)

## Running the project

    $ npm run dev

## Running the test

    $ npm run test
