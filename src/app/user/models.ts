import { Schema, model, Document } from "mongoose"

interface UserModel {
    username: string
    password: string
}

interface UserModelDocument extends Document, UserModel {}

const userSchema: Schema<UserModelDocument> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.index({ username: 1 })

const User = model<UserModelDocument>("User", userSchema)
export { UserModel, UserModelDocument, User }
