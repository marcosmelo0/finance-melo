import styled from "styled-components/native";
import colors from "../../../constants/colors";

export const MainHeaderContainer = styled.View`
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding-top: 10px;
    justify-content: space-between;
    width: 100%;
    border-bottom-width: 1px;
    border-bottom-color: 'rgba(255,255,255,0.4)';
`;

export const Avatar = styled.Image<{ size?: number }>`
    width: ${({ size }: { size?: number }) => (size ? `${size}px` : '40px')};
    height: ${({ size }: { size?: number }) => (size ? `${size}px` : '40px')};
    border-radius: ${({ size }: { size?: number }) => (size ? `${size / 2}px` : '20px')};
    resize: 'contain';
    border: none;
`;

export const DivAvatar = styled.View`
    align-items: center;
    justify-content: center;
    background-color: ${colors.gray};
    padding: 10px;
    border-radius: 20px;
`;

export const DivWelcome = styled.View`
    flex: 1;
`;