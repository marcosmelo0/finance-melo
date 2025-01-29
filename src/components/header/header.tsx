import {  LogoName, LogoNameTwo, Slogan } from "./styles";
import React from "react";

export default function Header() {
    return (
        <>
            <LogoName>
                Finance
                <LogoNameTwo>Melo</LogoNameTwo>
            </LogoName>
            <Slogan>Controle suas despesas</Slogan>
        </>
    )
}