"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Inbox from "@/components/Chat/ChatBox";
import {
  MessagesContainer,
  MessageList,
  MessageItem,
  UserName,
} from "@/globals/GlobalStyles";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
export interface Profile {
  email: string;
  name: string;
  password?: string;
  image: string;
  followers: string[];
  following: string[];
}

const MessageDashboard = ({ params, mail, post, setShareSection }: any) => {
  const { data: session } = useSession();
  console.log("Post received: ", post);
  console.log("Params: ", params);

  const [relationships, setRelationShips] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [openMessagePanel, setOpenMessagePanel] = useState(false);
  const [closeThisPanel, setCloseThisPanel] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [receiver, setReceiver] = useState<Profile | null>(null);
  let email = params?.id?.slice(0, params.id.indexOf("%")).concat("@gmail.com");

  if (!email) {
    email = mail;
  }

  console.log(email);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!email) return null;
      const response = await axios.get(`/api/users/?email=${email}`);

      const newRelationShips = [
        ...response?.data?.user?.followers,
        ...response?.data?.user?.following,
      ];

      setRelationShips(newRelationShips);
    };

    fetchUserDetails();

    return () => {
      console.log("Unmounting User hook");
    };
  }, [email]);

  let filteredRelationShips = new Set();

  relationships.map((user: string) => filteredRelationShips.add(user));

  const filteredRelationshipsArray = Array.from(filteredRelationShips);
  // console.log(filteredRelationshipsArray);

  useEffect(() => {
    // Create a function to fetch profiles using an email
    const fetchProfileByEmail = async (email: string) => {
      const response = await axios.get(`/api/users/?email=${email}`);
      return response.data.user;
    };

    if (filteredRelationshipsArray.length > 0) {
      // Fetch profiles for each email in the relationships array only once
      Promise.all(
        filteredRelationshipsArray.map((email:any) => fetchProfileByEmail(email))
      )
        .then((profiles) => {
          // Update the profiles state with the fetched profiles
          setProfiles(profiles);
        })
        .catch((error) => {
          console.error("Error fetching profiles:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredRelationshipsArray.length]);

  useEffect(() => {

  },[filteredRelationshipsArray])

  const handleMessageSubmission = async (profile: Profile) => {
    // setReceiver(profile);
    // console.log("Receiver Profile: ", profile.email);
    const imageUrl = session?.user?.image;
    const from = session?.user?.email;
    const response = await axios.post(
      `/api/messages/?&sender=${from}&receiver=${profile?.email}`,
      {
        imageUrl: imageUrl,
        post: post,
      }
    );
    // console.log(response.data);
    setShareSection(false);
  };

  return (
    <MessagesContainer>
      {params && <h1>Inbox</h1>}

      {!closeThisPanel && (
        <MessageList>
          {profiles?.map((profile: Profile, index: number) => (
            <MessageItem
              key={index}
              onClick={() => {
                setSelectedUser(profile);
                setOpenMessagePanel(true);
                setCloseThisPanel(true);
              }}
            >
              <Avatar src={profile.image} />
              <UserName
                onClick={
                  params
                    ? undefined
                    : (e: any) => handleMessageSubmission(profile)
                }
              >
                {profile?.name}
              </UserName>
            </MessageItem>
          ))}
        </MessageList>
      )}

      {openMessagePanel && (
        <Inbox
          params={selectedUser?.email}
          setOpenMessagePanel={setOpenMessagePanel}
          setCloseThisPanel={setCloseThisPanel}
          post={post}
        />
      )}
    </MessagesContainer>
  );
};

export default MessageDashboard;
