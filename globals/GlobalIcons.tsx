import {FaFacebook,FaTwitter,FaInstagram,FaReddit,FaComment,FaShare,FaFacebookMessenger, FaCheck , FaThumbsUp , FaWindowClose} from 'react-icons/fa';

import {HiMenu} from "react-icons/hi";

export const Facebook = () => <FaFacebook size={32} color="#1877F2"/>

export const Twitter = () => <FaTwitter size={32} color="#1DA1F2" />

export const Instagram = () => <FaInstagram size={32} color="#E1306C" />;

export const Reddit = () => <FaReddit size={32} color="#FF5700" />;

export const Comment = () => <FaComment size={20} />

export const Share = () => <FaShare size={20}/>

export const Like = () => <FaThumbsUp size={20}/>

export const Check = () => <FaCheck size={20}/>

export const MessageIcon = () => <FaFacebookMessenger size={25} />

export const Close = () => <FaWindowClose size={30}/>;

export const Hamburger = () => <HiMenu size={30} />