import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function BuildSuccessResponse<T>(res:Response,message:string,data:T){
   return res.status(StatusCodes.OK).json({
        message,
        ...data as object,
    })
}