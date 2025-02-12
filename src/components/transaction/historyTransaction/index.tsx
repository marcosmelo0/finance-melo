import { useState } from 'react';
import { CardTransactions, DivFilter, Label, MainTransaction } from './styles';
import { useAuth } from '@/contexts/AuthContext';
import { Text } from '@/styles/container/style';

export default function HistoryTransaction() {
    const { user } = useAuth();
    const [activeLabel, setActiveLabel] = useState('Todos');

    const filteredTransactions = () => {
        if (!user) {
            return [];
        }

        if (activeLabel === 'Despesas') {
            return user.expenses;
        } else if (activeLabel === 'Receitas') {
            return user.incomes;
        } else {
            return [...user.expenses, ...user.incomes];
        }
    };

    return (
        <MainTransaction>
            <DivFilter>
                <Label active={activeLabel === 'Todos'} onPress={() => setActiveLabel('Todos')}>Todos</Label>
                <Label active={activeLabel === 'Despesas'} onPress={() => setActiveLabel('Despesas')}>Despesas</Label>
                <Label active={activeLabel === 'Receitas'} onPress={() => setActiveLabel('Receitas')}>Receitas</Label>
            </DivFilter>
            {filteredTransactions().map((transaction, index) => (
                <CardTransactions key={index}>
                    <Text>{transaction.category}</Text>
                    <Text>{transaction.value}</Text>
                </CardTransactions>
            ))}
        </MainTransaction>
    );
}