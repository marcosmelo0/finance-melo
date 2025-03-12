import React, { useState, useEffect } from "react";
import { Text } from "@/styles/container/style";
import { CardExpenses, CardIncomes, DivIcon, HeaderCard, MainDiv } from "./styles";
import { View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import Icon from 'react-native-vector-icons/Feather';
import colors from "@/constants/colors";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Expense, Income } from "@/constants/supabase";

export default function ExpensesIncomes() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    const amountExpense = user?.expenses.reduce((acc: number, expense: Expense) => acc + expense.value, 0);
    const formattedExpenses = amountExpense?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const amountIncome = user?.incomes.reduce((acc: number, income: Income) => acc + income.value, 0);
    const formattedIncomes = amountIncome?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (loading) {
        return (
            <MainDiv>
                <CardExpenses>
                    <View>
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '50%', height: 20 }} />
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '60%', height: 20, marginTop: 5 }} />
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '70%', height: 20, marginTop: 5 }} />
                    </View>
                </CardExpenses>
                <CardIncomes>
                    <View>
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '50%', height: 20 }} />
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '60%', height: 20, marginTop: 5 }} />
                        <ShimmerPlaceHolder visible={!loading} style={{ width: '70%', height: 20, marginTop: 5 }} />
                    </View>
                </CardIncomes>
            </MainDiv>
        );
    }

    return (
        <MainDiv>
            <CardExpenses>
                <HeaderCard>
                    <Text fontWeight='bold' size={16}>Despesas</Text>
                    <DivIcon>
                        <Icon name='arrow-up-right' size={20} color='red' />
                    </DivIcon>
                </HeaderCard>
                <View>
                    <Text fontWeight='bold'>{formattedExpenses}</Text>
                    <Text size={11} color={colors.lightGray} style={{ paddingTop: 5 }}>{user?.expenses.length} Movimentações</Text>
                </View>
            </CardExpenses>
            <CardIncomes>
                <HeaderCard>
                    <Text fontWeight='bold' size={16}>Receitas</Text>
                    <DivIcon>
                        <Icon name='arrow-down-left' size={20} color={colors.green} />
                    </DivIcon>
                </HeaderCard>
                <View>
                    <Text fontWeight='bold'>{formattedIncomes}</Text>
                    <Text size={11} color={colors.zinc} style={{ paddingTop: 5 }}>{user?.incomes.length} Movimentações</Text>
                </View>
            </CardIncomes>
        </MainDiv>
    )
}