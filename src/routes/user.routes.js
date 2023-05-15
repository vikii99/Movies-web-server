import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import favouriteController from "../controllers/favourite.controller.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username must have min of 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already exists...");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must have min of 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must have min of 8 characters")
    .custom((value, { req }) => {
      if (value != req.body.password)
        throw new Error("confirmPassword does not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 8 })
    .withMessage("displayName must have min of 8 characters"),
  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username must have min of 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must have min of 8 characters"),
  requestHandler.validate,
  userController.signIn
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("username min 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("newPassword min 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmNewPassword min 8 characters")
    .custom((value, { req }) => {
      if (value != req.body.newPassword)
        throw new Error("confirmNewPassword does not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favourites",
  tokenMiddleware.auth,
  favouriteController.getFavouritesOfUser
);

router.post(
  "/favourites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"])
    .withMessage("mediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId cannot be empty"),
  body("mediaTitle").exists().withMessage("mediaType is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favouriteController.addFavourite
);

router.delete(
  "/favourites/:favouriteId",
  tokenMiddleware.auth,
  favouriteController.removeFavourite
);

export default router;
