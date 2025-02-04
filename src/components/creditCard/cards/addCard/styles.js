import colors from '@/constants/colors';
import styled from 'styled-components/native';

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${colors.lightGray};
  border-radius: 12px;
  background-color: ${colors.darkGray};
  margin-top: 30px;
`;

export const Input = styled.TextInput`
  padding: 12px;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  color: ${colors.white};
  background-color: ${colors.black};
`;

export const Button = styled.Pressable`
  padding: 12px;
  background-color: ${colors.primary};
  border-radius: 8px;
  align-items: center;
`;
