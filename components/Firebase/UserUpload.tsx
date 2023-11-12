"use client";
import React,{useState,useEffect} from "react";
import { secondCluster } from "@/utilities/FirebaseConfig";
import{
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
} from "firebase/storage";

export default function Image({title,onImageUpload}:{cluster:string,title:string,onImageUpload:(imageUrl:string) => void}){
    const [imageUpload,setImageUpload] = useState<File | null>(null);
    const [isUploading,setIsUploading] = useState(false);
    const [imageList,setImageList] = useState<string[]>([]);
    
    useEffect(()=>{},[isUploading])
   
    const imageListReference = ref(secondCluster,`${title}/`);
    useEffect(()=>{
        setImageList([]);
        listAll(imageListReference).then((response:any) => {
            response.items.forEach((item:any) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev:any) => [...prev,url]);
                })
            })
        })

        return () => {
            console.log("Unmounting Image Component");
        }

    },[isUploading]);
   

   // Add more else statements for uploading to other clusters

   const uploadImage = () => {
    const name = imageUpload?.name;
    if(imageUpload === null || imageUpload === undefined) return;
    
        const imageListReference = ref(secondCluster,`${title}/${name}`);
        setIsUploading(true);
        uploadBytes(imageListReference,imageUpload).then(()=>{
            setIsUploading(false);
            getDownloadURL(imageListReference).then((imageUrl) => {
                onImageUpload(imageUrl);
            })
        });
    }

   return(
    <div>
        <input type="file" 
        onChange={(event:any) => setImageUpload(event.target.files[0])}
        />
        <button type="button" onClick={uploadImage}>Upload</button>
    </div>
   )
}