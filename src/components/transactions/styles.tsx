import colors from "@/constants/colors";
import styled from "styled-components/native";

export const DivFilterContainer = styled.View`
    margin-top: 5px;
    background-color: ${colors.zinc};
    border-bottom-width: 1px;
    border-bottom-color: gray;
    position: absolute;
`;

export const DivCashFlow = styled.View`
    display: flex;
    padding: 10px 15px;
    height: 130px;
    margin: 0 auto;
    margin-top: 70px;
    border-width: 1px;
    border-color: #808080;
    width: 100%;
    border-radius: 20px;
`;

export const DivCashFlowTransactions = styled.View`
    display: flex;
    flex-direction: row;
    top: 10px;
    gap: 5px;
    justify-content: space-between;
    right: 10px;
`;

export const DivTransactions = styled.View`
    margin-top: 10px;
    padding: 10px 0px;
    gap: 5px;
`;

export const DivFilter = styled.View`
    display: flex;
    flex-direction: row;
`;

export const MonthButton = styled.TouchableOpacity`
    padding: 5px;
`;

export const SelectedIndicator = styled.View`
    height: 2px;
    background-color: ${colors.primary};
    margin-top: 2px;
`;