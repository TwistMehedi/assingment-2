
import express from "express";
import { UserController } from "./user.controller";
import { authorizeRoles, canUpdateUser, isAuthenticated } from "../../middleware/middleware";

const router = express.Router();

router.get("/", isAuthenticated, authorizeRoles("admin"), UserController.users);

router.put("/:userId", isAuthenticated, canUpdateUser, UserController.updateUser);
router.delete("/:userId", isAuthenticated, authorizeRoles("admin"), UserController.deleteUser);

export default router;
