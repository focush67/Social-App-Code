"use client";

import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

interface ButtonProps{
    background: string;
    color: string;
    hoverText: string;
    hoverBackground: string;
    size: string;
    disabled?: string | boolean;
}

interface ClickButton{
  onClick?: () => void;
}


export const CardImageContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
`;

export const GlobalWrapper = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const AlertContainer = styled.div`
  background-color: #ff6347; 
  color: #fff; 
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
`;

/* Navigation Menu Styles */

export const NavigationWrapper = styled.div`
  background-color: #000; 
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

export const NavLogo = styled(Image)`
    font-size: 1.5rem;
    font-weight: bold;
    background-color: darkgrey;
    border-radius: 50%;
`;

export const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 1.5rem;
    align-items: baseline;
`;

export const NavLink = styled(Link)`
    cursor: pointer;
    transition: color 0.3s;
    text-decoration: none;
    color: #fff;
    &:hover{
        color: #3578E5;
    }
`;

export const NavUserWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: baseline;
  justify-content: center;
`
export const NavProfileImage = styled(Image)`
  border-radius: 50%;
  margin: auto 0;
`;


export const ToggleContainer = styled.div`
    width: 42px;
    height: 26px;
    border: 1.5px solid #53c28b70;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    padding: 2px;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: auto;
`;

export const ToggleBall = styled.div`
    width: 18px;
    height: 18px;
    background-color: yellow;
    border-radius: 50%;
    position: absolute;
    padding: 5px;
    justify-content: center;
`

/* Body Section Styles*/


export const Main = styled.div`
    margin: 0;
    padding: 2rem;
    flex-grow: 1;
    display: grid;
`;

export const Button = styled.button<ButtonProps>`
    background-color: ${(props) => props.background};
    border-radius: 1.5rem;
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    padding: 10px 20px;
    border: none;
    transition: background-color 0.3s, color 0.3s;

    &:hover{
        background-color: ${(props) => props.hoverBackground};
        color: ${(props) => props.hoverText};
        cursor: pointer;
    }
`;



/* Form Stylings */

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto auto;
  padding: 2em;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 83vh;
  overflow-y: hidden;
`;

export const FormLabel = styled.label`
  font-weight: bold;
  margin: 5px 0;
  width: 100%;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const FormInput = styled.input`
  width: auto;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormTextArea = styled.textarea`
  width: auto;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin: 0 1.5em;
  &:hover {
    background-color: #0056b3;
  }
`;

/* Centering "Create Post" button */
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


// Styled components for the user details panel
export const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;;
  border-radius: 5px;
  box-shadow: 7px 10px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2%;
  align-items: baseline;
  margin-top: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: first baseline;
  align-items: center;
  gap: 0.1em;
`;

export const Username = styled.h2`
  font-size: 100%;
  margin: auto 0;
`;

export const FollowCounts = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-start;
`;

export const Followers = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const Following = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const Bio = styled.p`
  font-size: 14px;
  margin: 8px 0;
`;



// Styled components for the dashboard
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const UserActivity = styled.div`
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
`;

export const ActivityItem = styled.div`
  margin: 10px 0;
`;

export const HomeButton = styled.button`
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 20px;
`;

/**
 *  Post Rendering Styles
 */

export const PostGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  margin: auto auto;
  gap: 1em;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Card = styled.div`
  border: 0.5px solid #ccc;
  border-radius: 5px;
  display: flex;
  max-width: 500px;
  flex-direction: column;
  max-height: 800px
`;

export const CardTitle = styled.h2`
  font-size: 1.2rem;
  padding: 0 5px;
  text-align: center;
`;

export const CardImage = styled(Image)`
  object-fit: contain;
  max-width: 800px;
`;

export const CardDescription = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 10px;
  white-space: normal;
  max-width: 100%;
  display: flex;
  align-items: flex-start;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const LikeButton = styled.button<ClickButton>`
  background-color: #3a5998;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2e4d83;
  }
`;

export const CommentButton = styled.button`
  background-color: #808080;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  transition: background-color 0.3s;
  &:hover {
    background-color: #666666;
  }
`;

export const ShareButton = styled.button`
  background-color: #25d366;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1eaa55;
  }
`;

export const PostDescription = styled.div`
  display: flex;
  font-size: 13px;
  justify-content: center;
`


// Style for the comment section container
export const CommentSectionContainer = styled.div`
  margin: auto auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: max-content;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  border: 2px solid black;
  width: 100%;
  max-height:60vh;
  overflow-y: scroll;
`;

export const UserImage = styled(Image)`
  border-radius: 50%;
`;
// Style for individual comments
export const CommentItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  border: 1px solid #ddd;
  border-radius: 5px;
  align-items: center;
`;

// Style for the comment input area
export const CommentInput = styled.input`
  width: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Style for the submit button
export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


/* Footer Section Styles */

export const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: relative;
  bottom: 0;
`;

export const SocialLinks = styled.div`
    margin: 1rem 0;
`;

export const SocialIcon = styled.i`
    font-size: 1.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    transition: color 0.3s;

    &:hover{
        color: #084cba;
    }
`;


/*Styles for the Messages Inbox Section*/

export const SentMessage = styled.li`
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  align-self: flex-end;
  border: 1px solid white;
`;

export const ReceivedMessage = styled.li`
  list-style: none;
  padding: 10px;
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
`;


export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1em 1em;
  border: 1px solid white;
  height: fit-content;
`;

export const MessageItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  
  &:hover {
    background-color: #f5f5f5;
    color: black;
  }
`;

export const Avatar = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled.div`
  font-weight: bold;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



/*Styles for the Message Box for chatting between users*/

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  position: static;
  overflow-y: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
  top: 1;
  left: 0;
  right: 0;
`;

export const SenderImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const SenderProfileName = styled.div`
  font-weight: bold;
`;

export const Messagelist = styled.div`
  flex: 1;
  z-index: 2;
  overflow-y: auto;
  padding: 60px 10px 80px; /* Adjust padding for your design */
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  z-index: 2;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
`;

export const Message = styled.div`
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  max-width: 70%;
  z-index: 2;
  border: 1px solid white;
`;


export const ChatBoxContainer = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  overflow: hidden;
`;

export const ChatMessages = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 10px;
`;

export const ChatMessage = styled.div`
  background: red;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`;

