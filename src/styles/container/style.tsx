import styled from "styled-components/native";
import colors from "@/constants/colors";
import { ScrollView } from "react-native";

const Container = styled.View`
    flex: 1;
    background-color: ${colors.zinc};
    padding-left: 14px;
    padding-right: 14px;
`;

export const Text = styled.Text<{ color?: string; fontWeight?: string; size?: number }>`
    color: ${({ color }: { color?: string }) => color || colors.white};
    font-weight: ${({ fontWeight }: { fontWeight?: string }) => fontWeight || "normal"};
    font-size: ${({ size }: { size?: number }) => (size ? `${size}px` : "14px")};
`;

export const ScrollContainer = styled(ScrollView)`
    flex: 1;
    background-color: ${colors.zinc};
`;

export { Container };