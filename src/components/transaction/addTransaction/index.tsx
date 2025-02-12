import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { DivFilter, Label, MainTransaction } from "../historyTransaction/styles";

import Icon from 'react-native-vector-icons/Feather';
import colors from "@/constants/colors";
import { DivIcon } from "@/components/expensesIncomes/styles";
import { View } from "react-native";

export default function AddTransaction() {
    const { user } = useAuth();

    const [activeLabel, setActiveLabel] = useState('Despesas');

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
                <View style={{ position: 'absolute', backgroundColor: colors.zinc, zIndex: 10, left: 15, top: 10, borderRadius: 9999, padding: 1.5 }} >
                    <Icon name="arrow-up-right" size={20} color='red' />
                </View>
                <Label size={"50%"} active={activeLabel === 'Despesas'} onPress={() => setActiveLabel('Despesas')}>Despesas</Label>

                <View style={{ position: 'absolute', backgroundColor: colors.zinc, zIndex: 10, right: 125, top: 10, borderRadius: 9999, padding: 1.5 }} >
                    <Icon name="arrow-down-left" size={20} color={colors.green} />
                </View>
                <Label size={"50%"} active={activeLabel === 'Receitas'} onPress={() => setActiveLabel('Receitas')}>Receitas</Label>
            </DivFilter>

        </MainTransaction>
    )
}