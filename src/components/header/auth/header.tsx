import { Logo, Slogan, HeaderContainer } from "./styles";
import React from "react";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <HeaderContainer>
          <Logo source={require('@/assets/images/splash_logo.png')}
          />
            <Slogan>{title}</Slogan>
        </HeaderContainer>
    );
};

export default Header;