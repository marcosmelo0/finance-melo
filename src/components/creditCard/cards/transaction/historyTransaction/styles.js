import styled from "styled-components/native";
import colors from "@/constants/colors";

export const MainTransaction = styled.View`
    flex: 1;
    padding-bottom: 20px;
`;

export const DivFilter = styled.View`
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 30px;
    border-width: 0.3px;
    border-color: aliceblue;
    border-radius: 10px;
`;

export const Label = styled.Text`
    width: ${props => props.size || '33%'};
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    background-color: ${props => props.active ? colors.primary : 'transparent'};
    color: ${props => props.active ? colors.zinc : colors.white};
`;

export const CardTransactions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 0.5px;
    border-color: ${colors.lightGray};
    padding-bottom: 5px;
    margin-top: 20px;
    padding-left: 2px;
    align-items: center;
    padding-right: 2px;
`;
