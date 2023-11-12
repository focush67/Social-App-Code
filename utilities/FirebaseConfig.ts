
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const ClusterA = {
  apiKey: process.env.NEXT_PUBLIC_CLUSTERA_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_CLUSTERA_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_CLUSTERA_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CLUSTERA_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CLUSTERA_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_CLUSTERA_APPID
}; //  To store posts

const ClusterB = {
  apiKey: process.env.NEXT_PUBLIC_CLUSTERB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_CLUSTERB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_CLUSTERB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CLUSTERB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CLUSTERB_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_CLUSTERB_APPID
} // To store user images 

// Initialize Firebase
const firstPostsCluster = initializeApp(ClusterA, "Posts");
const secondUsersCluster = initializeApp(ClusterB , "Users");
export const firstCluster = getStorage(firstPostsCluster);
export const secondCluster = getStorage(secondUsersCluster);

