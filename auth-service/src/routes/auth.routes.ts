import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { login, logout, me, refreshToken, register } from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export function createAuthRouter():Router {
    const router = Router();

    router.post("/register",asyncHandler(register));
    router.post("/login",asyncHandler(login));
    router.post("/refresh-token",asyncHandler(refreshToken));
    router.post("/logout",asyncHandler(logout));
    router.get("/me",authenticate,asyncHandler(me));

    return router
}