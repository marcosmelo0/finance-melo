import colors from "@/constants/colors";
import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView`
    width: 100%;
`;

export const MainCard = styled.View`
    flex-direction: row;
`;

export const DivCard = styled.View`
    width: 320;
    border-radius: 10px;
    margin-top: 10px;
    max-height: 100%;
`;

export const ImageCart = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 20px;
    object-fit: contain;
`;

export const ImageAddCard = styled.Image`
    width: 100%;
    height: 190px;
    border-radius: 20px;
    object-fit: contain;
    border: none;
    overflow: hidden;
    right: 70;
    top: 13;
`;

export const TitleAddCard = styled.Text`
    color: ${colors.white};
    top: 18;
    position: absolute;
    z-index: 10;
    left: 20;
    font-weight: bold;
`;
