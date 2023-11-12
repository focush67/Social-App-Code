import {models,model,Schema} from "mongoose";

export const CommentSchema = new Schema({
    content: {type: String,default:"Comment down below"},
    user: {type: String},
    image: {type: String},
    user_email: {type: String},
    timestamp: {type: Date, default: Date.now},
}); // Use this to store details of a comment made to the post

export const PostSchema = new Schema({
    email: {type: String, required: true}, // user's email
    title: {type: String, required: true}, // post title
    description: {type: String}, // post description
    image: {type: String}, // user's profile image
    userName: {type: String}, // user's username (initialy set to session?.user?.name)
    tags: [
        {type:String}
    ], // tags for a post
    cover: {type: String}, // cover photo of a post
    likes: {type: Number, default: 0}, // likes of a post
    comments: [CommentSchema], // comments of a post
    shares:{type: Number, default: 0}, //shares of a post
},{
    timestamps: true,
});

export const Post = (models.Post || model("Post" , PostSchema));
