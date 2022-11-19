#  Connections API

## General info
Server project based on the REST API architecture for creating and managing users and their individual contact sets contained in the MongoDB database.

## Technologies
**Project was created with:**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![.ENV](https://img.shields.io/badge/.ENV-100000?style=for-the-badge&logo=.ENV&logoColor=000000&labelColor=ECD53F&color=ECD53F) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Passport](https://img.shields.io/badge/PASSPORT-100000?style=for-the-badge&logo=Passport&logoColor=FFFFFF&labelColor=34E27A&color=34E27A)  ![Gravatar](https://img.shields.io/badge/Gravatar-100000?style=for-the-badge&logo=Gravatar&logoColor=FFFFFF&labelColor=1E8CBE&color=1E8CBE) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![SendGrid](https://img.shields.io/badge/SendGrid-100000?style=for-the-badge&logo=Twilio&logoColor=FFFFFF&labelColor=225DFF&color=225DFF) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


## Requirements
Create a server based on the REST API methodology that allows you to register and authenticate users via [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) and manage their data and individual sets of contacts stored in the [MongoDB](https://www.mongodb.com/) database. Use [Mongoose](https://mongoosejs.com/) to work with the database, [Multer](https://github.com/expressjs/multer), [Jimp](https://www.npmjs.com/package/jimp) and [Gravatar](https://www.npmjs.com/package/gravatar) to work with photo files, [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to work with the REST API, [Joi](https://github.com/hapijs/joi) package for additional validation, and to create unit tests use [Jest](https://jestjs.io/) and [SuperTest](https://www.npmjs.com/package/supertest). Use [SendGrid](https://sendgrid.com/) service to create user email verification after registration. Use the [Docker](https://www.docker.com/) platform to create the application's Dockerfile.

#### Acceptance criteria:
- [HW 02 - Express](https://github.com/goitacademy/nodejs-homework/blob/master/homework-02/README.pl.md)
- [HW 03 - MongoDB](https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/README.pl.md)
- [HW 04 - Auth](https://github.com/goitacademy/nodejs-homework/blob/master/homework-04/README.pl.md)
- [HW 05 - Avatars](https://github.com/goitacademy/nodejs-homework/blob/master/homework-05/README.pl.md)
- [HW 06 - Email](https://github.com/goitacademy/nodejs-homework/blob/master/homework-06/README.pl.md)
