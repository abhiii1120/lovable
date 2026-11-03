import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { login, refreshToken, register } from "../controller/auth.controller.js";

export function createAuthRouter():Router {
    const router = Router();

    router.post("/register",asyncHandler(register));
    router.post("/login",asyncHandler(login));
    router.post("/refresh-token",asyncHandler(refreshToken));

    return router
}