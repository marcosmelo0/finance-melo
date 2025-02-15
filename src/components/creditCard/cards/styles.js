import colors from "@/constants/colors";
import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView`
    width: 100%;
`;

export const MainCard = styled.View`
    flex-direction: row;
`;

export const DivCard = styled.View`
    width: 295px;
    margin-top: 5px;
    height: 190px;
`;

export const ImageCard = styled.Image`
    width: 95%;
    height: 200px;
    border-radius: 14px;
    object-fit: contain;
`;

export const ImageAddCard = styled.Image`
    width: 100%;
    height: 190px;
    object-fit: contain;
    right: 25px;
`;

export const TitleAddCard = styled.Text`
    color: ${colors.white};
    top: 4px;
    position: absolute;
    z-index: 10;
    left: 60px;
    font-weight: bold;
`;
