import { ReactNode } from "react";

export interface Profile {
    email: string;
    name: string;
    image: string;
}

export interface FollowersAndFollowings extends Profile{
    followers: Profile[];
    following: Profile[];
}

export interface Message {
    _id?: string;
    content?: string;
    sender: string;
    receiver: string;
    sender_image: string;
    post?:Post;
    createdAt?: string;
}

export interface Post {
    _id?: string;
    email: string;
    title: string;
    description: string;
    image: string;
    userName: string;
    tags: string[];
    cover: string;
    likes: number;
    comments: CommentSchema[];
    shares: Number;
}

export interface CommentSchema {
    _id?: string;
    content?: string;
    user: string;
    image: string;
    user_email: string;
}

export interface ThemeContextType {
    toggle: () => void;
    mode: string;
}

export interface ProviderProps {
    children: ReactNode;
}

export interface AppContextType {
    allPosts: Post[];
    savePostsToLocalStorage: (posts: Post[]) => void | null;
    updatePostLikes : (postId: any) => void | null;
}