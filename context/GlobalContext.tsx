"use client";
import { createContext, useState, useEffect } from "react";
import { Post, ProviderProps } from "@/globals/GlobalTypes";

// -------------- Context for Theme of the App -------------------------------------//

export const Theme = createContext<any | null>(null);

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [mode, setMode] = useState("dark");
  const toggle = () => {
    console.log("Switching Mode");
    setMode((prev: string) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <Theme.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </Theme.Provider>
  );
};

// ----------------- Context for Caching Posts --------------------------------------//

export const AppContext = createContext<any | null>(null);
export const AppProvider = ({ children }: ProviderProps) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const savePostsToLocalStorage = (posts: Post[]): undefined => {
    try {
      localStorage.setItem("All_Posts", JSON.stringify(posts));
    } catch (error: any) {
      console.log(error);
    }
  };
  const updatePostLikes = (postId: any) => {
    const updatedPosts = allPosts.map((post: Post) => {
      if (post._id === postId) {
        return { ...post, likes: post?.likes + 1 };
      }
      return post;
    });

    setAllPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  useEffect(() => {
    const cachedPosts = localStorage.getItem("All_Posts");
    if (cachedPosts) {
      try {
        const parsedPosts = JSON.parse(cachedPosts);
        setAllPosts(parsedPosts);
      } catch (error: any) {
        console.log(error);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ allPosts, savePostsToLocalStorage, updatePostLikes }}
    >
      {children}
    </AppContext.Provider>
  );
};
