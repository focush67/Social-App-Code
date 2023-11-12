import { Schema,models,model } from "mongoose";

export const Profile = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String,required: true},
    image: {type: String},
    followers: [{
        type: String
    }],
    following: [{
        type: String
    }],
},{
    timestamps: true,
});

export const User = (models?.User || model("User",Profile));