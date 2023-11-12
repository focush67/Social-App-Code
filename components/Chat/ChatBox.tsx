"use client";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Close } from '@/globals/GlobalIcons';
import PostCard from './PostCard';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Timestamp = styled.div`
  font-size: small;
  margin-left: 10px;
  color: #888; /* You can adjust the color as needed */
`;

const ReceiverInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; /* Push the close button to the right */
`;

const ReceiverProfileImage = styled.img`
  width: 40px; /* Adjust the size as needed */
  height: 40px; /* Adjust the size as needed */
  border-radius: 50%;
  margin-right: 10px;
`;

const ReceiverUsername = styled.div`
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const SentMessage = styled(Message)`
  align-self: flex-end;
`;

const ReceivedMessage = styled(Message)`
  align-self: flex-start;
`;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

const MessageText = styled.div`
  margin-left: 10px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  padding: 5px;
  border-radius: 20px;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
`;

export interface MessageProps {
  sender: string;
  receiver: string;
  sender_image: string;
  content: string;
  createdAt: string;
  post: [{
    userName: string;
    _id: string;
    email: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    cover: string;
    likes: number;
    shares: number;
    comments?: string[];
  }];
}

const Inbox = ({ params, setOpenMessagePanel, setCloseThisPanel, post }:any) => {
  const inboxFromUser = params;
  const { data: session } = useSession();
  const [user, setUser] = useState<any>();
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [conversations, setConversations] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get(`/api/users/?email=${inboxFromUser}`);
      setUser(response.data.user);
    };
    fetchUserDetails();
  }, [inboxFromUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `/api/messages/?sender=${session?.user?.email}&receiver=${inboxFromUser}`
      );
      const conversations1 = response.data?.conversations;
      const conversations2 = response.data?.conversations2;

      const allMessages = conversations1
        ? conversations1.concat(conversations2)
        : conversations2;
      setConversations(allMessages);
    };
    fetchMessages();
  }, [submitted, content, session, inboxFromUser]);

  const handleMessageSubmission = async (e: any) => {
    const imageUrl = session?.user?.image;
    const from = session?.user?.email;
    const response = await axios.post(
      `/api/messages/?content=${content}&sender=${from}&receiver=${inboxFromUser}`,
      {
        imageUrl: imageUrl,
        post: post,
      }
    );
    console.log(response.data);

    setSubmitted(!submitted);
    setContent('');
  };

  return (
    <ChatContainer>
      <Header>
        <ReceiverInfo>
          <ReceiverProfileImage src={user?.image} alt="Receiver" />
          <ReceiverUsername>{user?.email}</ReceiverUsername>
        </ReceiverInfo>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            setOpenMessagePanel(false);
            setCloseThisPanel(false);
          }}
        >
          <Close />
        </div>
      </Header>
      <ChatMessages>
        {conversations
          .sort(
            (a: any, b: any) =>
              Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
          )
          .map((conversation, index) => (
            <MessageContent key={index}>
              {session?.user?.email === conversation.sender ? (
                <SentMessage>
                  <MessageContent>
                    <ReceiverProfileImage
                      src={conversation.sender_image}
                      alt="Profile"
                    />
                    {conversation.content ? (
                      <>
                      <MessageText>{conversation.content}</MessageText>
                      {
                        <Timestamp>
                        {new Date(conversation.createdAt).toLocaleString()} 
                      </Timestamp>
                      }
                      </>
                      
                    ) : (
                      <>
                      <div style={{ width: 'fit-content' }}>
                        <PostCard post={conversation.post[0]} />
                      </div>
                      <Timestamp>
                        {new Date(conversation.createdAt).toLocaleString()} 
                      </Timestamp>
                      </>
                    )}
                  </MessageContent>
                </SentMessage>
              ) : (
                <ReceivedMessage>
                  <MessageContent>
                    <ReceiverProfileImage
                      src={conversation.sender_image}
                      alt="Profile"
                    />
                    {conversation.content ? (
                      <>
                      <MessageText>{conversation.content}</MessageText>
                      <Timestamp>
                        {new Date(conversation.createdAt).toLocaleString()} 
                      </Timestamp>
                      </>
                    ) : (
                      <>
                      <div style={{ width: 'fit-content' }}>
                        <PostCard post={conversation.post[0]} />
                      </div>
                      <Timestamp>
                      {new Date(conversation.createdAt).toLocaleString()} 
                    </Timestamp>
                    </>
                    )}
                  </MessageContent>
                </ReceivedMessage>
              )}
            </MessageContent>
          ))}
      </ChatMessages>
      <InputBox>
        <MessageInput
          type="text"
          placeholder="Type a message"
          onChange={(e: any) => setContent(e.target.value)}
        />
        <SendButton onClick={handleMessageSubmission} disabled={!session}>
          Send
        </SendButton>
      </InputBox>
    </ChatContainer>
  );
};

export default Inbox;
