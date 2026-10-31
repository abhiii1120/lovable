import bcrypt from "bcryptjs";
import type { NextFunction,Request,Response } from "express";
import jwt, {type Secret,type SignOptions} from 'jsonwebtoken';

import {env} from '../config/env.js';

const SALT_ROUNDS = 10;

// function signToken(payload: AuthTokenPayload){
//     return jwt.sign(payload)
// }