"use client";
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.div`
  font-weight: bold;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const PostCard = ({ post }: any) => {
  return (
    <CardContainer>
      <CardHeader>
        <ProfileImage src={post.image} alt="Profile" />
        <Username>{post.userName}</Username>
      </CardHeader>
      <PostImage src={post.cover} alt="Post" />
    </CardContainer>
  );
};

export default PostCard;
