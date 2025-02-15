import { View } from "react-native";
import { DivFilter, Label } from "../historyTransaction/styles";
import Icon from 'react-native-vector-icons/Feather';
import colors from "@/constants/colors";
import { useState } from "react";
import React from "react";
import AddExpenseTransaction from "../addExpenses";
import AddIncomes from "../addIncomes";

export default function SeletecTransaction() {
    const [activeLabel, setActiveLabel] = useState('Despesas');

    return (
        <>
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
            {activeLabel === 'Despesas' ? (
                <AddExpenseTransaction />
            ) : (
                <AddIncomes />
            )}
        </>
    )
}