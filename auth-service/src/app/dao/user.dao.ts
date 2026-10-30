import type { HydratedDocument } from "mongoose";
import { type UserDocumentType } from "../../models/user.model.js";

export type UserDocumentLike = HydratedDocument<UserDocumentType>;

