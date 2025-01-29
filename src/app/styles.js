import styled from "styled-components/native";
import colors from "@/constants/colors";

const Container = styled.View`
    flex: 1;
    background-color: ${colors.zinc};
    padding-top: 34;
    padding-left: 16;
    padding-right: 16;
`;

const Form = styled.View`
    flex: 1;
    margin-top: 34;
    background-color: ${colors.white};
    border-top-left-radius: 20;
    border-top-right-radius: 20;
    padding-top: 20;
    padding-right: 14;
    padding-left: 14;

`;

const Label = styled.Text`
    color: ${colors.zinc};
    margin-bottom: 4px;
`;

const Input = styled.TextInput`
    color: ${colors.zinc};
    border-width: 1;
    border-color: ${colors.gray};
    border-radius: 8px;
    margin-bottom: 16;
    padding-left: 8;
    padding-right: 8;
    padding-top: 14;
    padding-bottom: 14;
`;

const Button = styled.Pressable`
    background-color: ${colors.green};
    padding-top: 14;
    padding-bottom: 14;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ButtonText = styled.Text`
    color: ${colors.white};
    font-size: 16px;
    font-weight: bold;
`;


export { Container, Form, Label, Input, Button, ButtonText };