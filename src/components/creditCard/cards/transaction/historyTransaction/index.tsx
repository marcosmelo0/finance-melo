import { useState } from 'react';
import { CardTransactions, DivFilter, Label, MainTransaction } from './styles';
import { useAuth } from '@/contexts/AuthContext';
import { Text } from '@/styles/container/style';
import Icon from '@expo/vector-icons/Feather'
import colors from '@/constants/colors';
import { DivIcon } from '@/components/expensesIncomes/styles';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View } from 'react-native';

export default function HistoryTransaction() {
    const { user } = useAuth();
    const [activeLabel, setActiveLabel] = useState('Todos');


    const filteredTransactions = () => {
        if (!user) {
            return [];
        }

        let transactions = [];
        if (activeLabel === 'Despesas') {
            transactions = user.expenses;
        } else if (activeLabel === 'Receitas') {
            transactions = user.incomes;
        } else {
            transactions = [...user.expenses, ...user.incomes];
        }

        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    return (
        <MainTransaction>
            <DivFilter>
                <Label active={activeLabel === 'Todos'} onPress={() => setActiveLabel('Todos')}>Todos</Label>
                <Label active={activeLabel === 'Despesas'} onPress={() => setActiveLabel('Despesas')}>Despesas</Label>
                <Label active={activeLabel === 'Receitas'} onPress={() => setActiveLabel('Receitas')}>Receitas</Label>
            </DivFilter>
            {filteredTransactions().map((transaction, index) => {
                const isExpense = 'type_payment' in transaction;
                return (
                    <CardTransactions key={index}>
                        <DivIcon style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            {isExpense ? (
                                <>
                                    {transaction.type_payment === 'Cartão de crédito' && (
                                        <Icon style={{ padding: 12, backgroundColor: 'red', borderRadius: 10 }} name='credit-card' size={20} color='aliceblue' />
                                    )}
                                    {transaction.type_payment === 'PIX' && (
                                        <View style={{ flexDirection: 'column' }}>
                                            <FontAwesome6 style={{ padding: 12, backgroundColor: colors.green, borderRadius: 10 }} name='pix' color={colors.zinc} size={20} />
                                            <Text fontWeight='bold' color={colors.zinc} size={10} style={{ bottom: 15, left: 14 }}>Pix</Text>
                                        </View>
                                    )}
                                </>
                            ) : (
                                <Icon style={{ padding: 12, backgroundColor: colors.green, borderRadius: 10 }} name='dollar-sign' size={20} color='aliceblue' />
                            )}
                            <Text>{transaction.category}</Text>
                        </DivIcon>
                        <DivIcon style={{ flexDirection: 'row', gap: 5 }}>
                            <Icon style={{ top: 2 }} name={isExpense ? 'arrow-down' : 'arrow-up'} size={18} color={isExpense ? 'red' : colors.green} />
                            <Text fontWeight='bold' color={isExpense ? 'red' : colors.green}>{transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        </DivIcon>
                    </CardTransactions>
                );
            })}
        </MainTransaction>
    );
}