import { type InferSchemaType, model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    refreshTokenHash:{
        type:String,
        default:null
    },
},{
    timestamps:true,
})

export type UserDocumentType = InferSchemaType<typeof userSchema> & { _id:Types.ObjectId};

export const UserModel = model<UserDocumentType>("User",userSchema);

export {userSchema};

