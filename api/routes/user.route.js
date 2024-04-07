import express from "express";
import { test, updateUser,deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.put("/delete/:userId", verifyToken, deleteUser);

export default router;
