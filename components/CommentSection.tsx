"use client";

import { Post } from "@/globals/GlobalTypes"
import { Check } from "@/globals/GlobalIcons"
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import {CommentSectionContainer,UserImage,CommentInput,CommentItem, Button} from "@/globals/GlobalStyles";


function CommentSection({ post , setCommentSection}: { post: Post, setCommentSection: any}) {
  console.log("POST: ",post);
  
  const [comment, setComment] = useState("");

  const { data: session } = useSession();
 
  const handleCommentSubmission = async () => {
    if(!session){
        return;
    }
    try {
      const response = await axios.post(
        `/api/post-update/?type=addComment&from=${session?.user?.email}&comment=${comment}&id=${post._id}`,{
          imageUrl: session?.user?.image
        }
      );

      console.log(response.data);

      setCommentSection(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (

    <CommentSectionContainer>
      {post &&
        post.comments.map((comment:any, index) => (
          <div style={{display:"flex",width:"auto",justifyContent:"space-between"}} key={index}>
            <CommentItem key={index} style={{marginBottom:"2em"}}>
            {
              comment && comment.image && comment.content.length > 0 &&(
                <UserImage src={comment.image} alt="u" width={40} height={30} layout="fixed" style={{marginRight:"0.5em"}}  />
              )
            }
             {comment?.content}
          </CommentItem>
          </div>
        ))}

       
      <div style={{ display: "flex" , justifyContent:"space-between"}}>
        <CommentInput
          type="text"
          placeholder="Add a comment..."
          onChange={(e: any) => setComment(e.target.value)}
          required
          style={{
            width:"100%"
          }}
        />
        <Button onClick={handleCommentSubmission} background="white" color="black" hoverBackground="darkblue" hoverText="white" size="1em" type="submit" disabled={!session} style={{marginRight:"1em", marginLeft:"1em"}} ><Check/></Button>
      </div>
    </CommentSectionContainer>
    
  );
}

export default CommentSection;
