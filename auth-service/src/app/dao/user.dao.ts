/**
 * Data access object for user persistence and auth token hashing.
 */
import type { HydratedDocument } from "mongoose";
import {  UserModel, type UserDocumentType } from "../../models/user.model.js";

export type UserDocumentLike = HydratedDocument<UserDocumentType>;

/**
 * Finds a user based on their email address.
 * 
 * @param email - User email to search for.
 * @returns Matching user document or null.
 */
export async function findUserByEmail(email:string): Promise<UserDocumentLike | null> {
    return UserModel.findOne({email:email.toLowerCase()}).exec();
}

/**
 * Finds the user by their unique Id.
 * 
 * @param userId - Mongo user Id.
 * @returns Matching user document or null.
 */
export async function findUserById(userId:string):Promise<UserDocumentLike | null> {
    return UserModel.findById(userId).exec()
}

/**
 * Create a new user record.
 * 
 * @param input - User fields to persist.
 * @returns The created User document.
 */
export async function createUser(input:{
    name:string;
    email:string;
    passwordHash:string;
}) : Promise<UserDocumentLike | null>{
    return UserModel.create({
        name:input.name,
        email:input.email,
        passwordHash:input.passwordHash,
    });
}