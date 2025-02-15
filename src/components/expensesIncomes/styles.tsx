import styled from "styled-components/native";
import colors from "@/constants/colors";

export const MainDiv = styled.View`
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 10px;
`;

export const CardExpenses = styled.View`
    flex: 1;
    background-color: #fc1313ce;
    padding: 15px 10px;
    border-radius: 10px;
    margin-right: 10px;
    height: 102px;
    max-height: 110px;
    gap: 2px;
`;

export const HeaderCard = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const DivIcon = styled.View`
    background-color: ${colors.zinc};
    border-radius: 50px;
    padding: 5px;
`;

export const CardIncomes = styled.View`
    flex: 1;
    background-color: ${colors.primary};
    padding: 15px 10px;
    border-radius: 10px;
    height: 102px;
    max-height: 110px;
`;