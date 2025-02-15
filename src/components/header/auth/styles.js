import styled from "styled-components/native";

const HeaderContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

const Logo = styled.Image`
    width: 300px;
    height: 180px;
    resize: 'contain';
`;

const Slogan = styled.Text`
    color: white;
    font-size: 34px;
    text-align: center;
    top: 15;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


export { Logo, Slogan, HeaderContainer };