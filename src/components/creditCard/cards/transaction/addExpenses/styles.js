import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const DivDate = styled(TouchableOpacity)`
    flex-direction: row;
    width: 100%;
    gap: 10px;
    margin-top: 20px;
    background-color: aliceblue;
    padding: 10px;
    border-radius: 10px;
`;

export const DivCard = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
    background-color: aliceblue;
    padding: 10px;
    border-radius: 10px;
`;