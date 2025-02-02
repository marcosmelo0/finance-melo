import styled from "styled-components/native";
import colors from "@/constants/colors";
import { Animated } from "react-native";

const Form = styled.View`
    flex: 1;
    margin-top: 34px;
    background-color: ${colors.white};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 20px;
    padding-right: 14px;
    padding-left: 14px;
`;

const InputGroup = styled.View`
    position: relative;
    margin-bottom: 16px;
`;

const Label = styled(Animated.Text)`
    position: absolute;
    top: 14px;
    left: 14px;
    color: ${colors.zinc};
    pointer-events: none;
    background-color: ${colors.white};
    padding-left: 4px;
    padding-right: 4px;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Input = styled.TextInput`
    color: #000;
    padding: 14px;
    padding-top: 20px;
    border: 1px solid #9e9e9e;
    border-radius: 10px;
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
        border-color: ${colors.primary};
    }
`;

const Button = styled.Pressable`
    background-color: ${colors.green};
    padding-top: 14px;
    padding-bottom: 14px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const ButtonText = styled.Text`
    color: ${colors.white};
    font-size: 16px;
    font-weight: bold;
`;

const ErrorText = styled.Text`
    color: red;
    margin-bottom: 16px;
`;

export { Form, InputGroup, Label, Input, Button, ButtonText, ErrorText };