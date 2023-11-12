
import React from 'react';
import { Facebook,Twitter,Instagram,Reddit } from '@/globals/GlobalIcons';
import { FooterWrapper , SocialLinks , SocialIcon } from '@/globals/GlobalStyles'
const Footer = () => {
  return (
    <FooterWrapper>
      <SocialLinks>
        <SocialIcon><Facebook/></SocialIcon>
        <SocialIcon><Twitter/></SocialIcon>
        <SocialIcon><Instagram/></SocialIcon>
        <SocialIcon><Reddit/></SocialIcon>
      </SocialLinks>
      <SocialLinks>
        @2023 All Rights Reserved
      </SocialLinks>
    </FooterWrapper>
  )
}

export default Footer