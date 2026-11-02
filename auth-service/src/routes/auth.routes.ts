import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { register } from "../controller/auth.controller.js";

export function createAuthRouter():Router {
    const router = Router();

    router.post("/register",asyncHandler(register))

    return router
}