import {model,models,Schema} from "mongoose";
import { PostSchema } from "./PostSchema";

const MessageSchema = new Schema({
    content: {type: String, default:"shared a post"},
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    sender_image: {type: String},
    post: [PostSchema],
},{
    timestamps: true,
});

export const Message = (models.Message || model("Message" , MessageSchema));
