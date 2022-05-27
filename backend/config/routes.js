const express = require("express");
const cors = require("cors");
const controllers = require("../app/controllers");
const authController = controllers.api.v1.authController;
const usersController = controllers.api.v1.usersController;
const handleGoogleLoginOrRegister = controllers.api.v1.handleGoogleLoginOrRegister;
const carsController = require("../app/controllers/api/v1/carsController");
const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(express.json());

// Melihat seluruh user pada database
apiRouter.get("/api/v1/users", usersController.getUsers);

// Memnambahkan user pada database
apiRouter.post("/api/v1/register", usersController.register);

// Melakukan login
apiRouter.post("/api/v1/login", authController.login);

// Melakukan login melalui google
apiRouter.post("/api/v1/auth/google", handleGoogleLoginOrRegister);

// Melakukan update & delete user
apiRouter.route("/api/v1/user/:id").put(usersController.update).delete(usersController.deleteUser);

// Melakukan get Cars
apiRouter.get("/api/v1/cars/:date/:time/:passenger", carsController.list);

// Mendapatkan user yang login
apiRouter.get("/api/v1/user", authController.authorize, usersController.getCurrentUser);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;