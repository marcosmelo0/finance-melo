import React, { useState, useContext } from "react";
import { RefreshControl } from "react-native";
import { Container, ScrollContainer, Text } from "@/styles/container/style";
import MainHeader from "@/components/header/main/header";
import ExpensesIncomes from "@/components/expensesIncomes";
import Cards from "@/components/creditCard/cards";
import { useAuth } from "@/contexts/AuthContext";
import HistoryTransaction from "@/components/creditCard/cards/transaction/historyTransaction";
import Balance from "@/components/balance";

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const { refreshUser } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            refreshUser();
            setRefreshing(false);
            setRefreshKey(prevKey => prevKey + 1);
        }, 100);
    };

    return (
        <Container>
            <MainHeader />
            <ScrollContainer
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                key={refreshKey}
            >
                <Balance />
                <Cards />
                <ExpensesIncomes />
                <HistoryTransaction />
            </ScrollContainer>
        </Container>
    );
}