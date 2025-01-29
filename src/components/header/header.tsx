import { LogoName, LogoNameTwo, Slogan } from "./styles";
import React from "react";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <>
            <LogoName>
                Finance
                <LogoNameTwo>Melo</LogoNameTwo>
            </LogoName>
            <Slogan>{title}</Slogan>
        </>
    );
};

export default Header;