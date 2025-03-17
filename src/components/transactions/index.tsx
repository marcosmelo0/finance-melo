import { Text } from "@/styles/container/style";
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { DivFilterContainer, DivFilter, MonthButton, SelectedIndicator, DivCashFlow, DivCashFlowTransactions, DivTransactions } from "./styles";
import Icon from 'react-native-vector-icons/Feather';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { useAuth } from "@/contexts/AuthContext";
import { Expense, Income } from "@/constants/supabase";
import colors from "@/constants/colors";

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function Transactions() {
    const { user } = useAuth();
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    useEffect(() => {
        const currentMonth = new Date().getMonth();
        setSelectedMonth(currentMonth);
    }, []);

    const filteredExpenses = user?.expenses
        .filter((expense: Expense) => new Date(expense.date).getMonth() === selectedMonth)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

    const filteredIncomes = user?.incomes
        .filter((income: Income) => new Date(income.date).getMonth() === selectedMonth)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

    const amountExpense = filteredExpenses.reduce((acc: number, expense: Expense) => acc + expense.value, 0);
    const formattedExpenses = amountExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const amountIncome = filteredIncomes.reduce((acc: number, income: Income) => acc + income.value, 0);
    const formattedIncomes = amountIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const amountTotal = amountIncome - amountExpense;
    const formattedTotal = amountTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const amountMovimentations = filteredExpenses.length + filteredIncomes.length;

    const showTooltip = () => {
        Alert.alert("O fluxo de caixa é...", "O saldo disponível, ou seja, a diferença entre o valor total recebido e os pagamentos realizados no mesmo período.");
    };

    return (
        <ScrollView>
            <DivFilterContainer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 5, width: '79%' }}>
                    <DivFilter>
                        {months.map((month, index) => (
                            <MonthButton key={index} onPress={() => setSelectedMonth(index)}>
                                <Text>{month}</Text>
                                {selectedMonth === index && <SelectedIndicator />}
                            </MonthButton>
                        ))}
                    </DivFilter>
                </ScrollView>
            </DivFilterContainer>
            <DivCashFlow>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text size="18" fontWeight="bold">Fluxo de caixa</Text>
                        <TouchableOpacity onPress={showTooltip}>
                            <Ionicons style={{ top: 1 }} name="help-circle" size={22} color={colors.lightGray} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Ionicons size={30} name="arrow-forward-circle-sharp" color={colors.lightGray} />
                    </TouchableOpacity>
                </View>
                <Text color={colors.gray} size="12">{amountMovimentations} movimentações</Text>

                <DivCashFlowTransactions>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='arrow-up-right' size={20} color='red' />
                        <Text>{formattedExpenses}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='arrow-down-left' size={20} color={colors.green} />
                        <Text>{formattedIncomes}</Text>
                    </View>
                    <Text color={amountTotal >= 0 ? colors.green : 'red'}>{formattedTotal}</Text>
                </DivCashFlowTransactions>
            </DivCashFlow>
            <DivTransactions>
                <Text style={{ marginBottom: 10 }} fontWeight="bold" size={18}>Histórico</Text>
                {filteredExpenses.length === 0 && filteredIncomes.length === 0 ? (
                    <Text size={14} color={colors.lightGray}>Nenhuma movimentação encontrada, tente outro período! 😉</Text>
                ) : (
                    <>
                        {filteredExpenses.map((expense: Expense, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: colors.lightGray, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    {expense.type_payment === 'Cartão de crédito' && (
                                        <Icon style={{ padding: 12, backgroundColor: 'red', borderRadius: 10 }} name='credit-card' size={20} color='aliceblue' />
                                    )}
                                    {expense.type_payment === 'PIX' && (
                                        <View style={{ flexDirection: 'column' }}>
                                            <FontAwesome6 style={{ padding: 12, backgroundColor: colors.green, borderRadius: 10 }} name='pix' color='aliceblue' size={20} />
                                        </View>
                                    )}
                                    <Text>{expense.category}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <Icon name='arrow-down' size={20} color='red' />
                                    <Text color='red'>{expense.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                </View>
                            </View>
                        ))}
                        {filteredIncomes.map((income: Income, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderBottomColor: colors.lightGray, padding: 10, borderRadius: 10, marginBottom: 5 }}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Icon style={{ padding: 12, backgroundColor: colors.green, borderRadius: 10 }} name='dollar-sign' size={20} color='aliceblue' />
                                    <Text>{income.category}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <Icon name='arrow-up' size={20} color={colors.green} />
                                    <Text color={colors.green}>{income.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                </View>
                            </View>
                        ))}
                    </>
                )}
            </DivTransactions>
        </ScrollView>
    )
}