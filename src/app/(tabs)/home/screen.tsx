import React, { useState, useContext } from "react";
import { RefreshControl } from "react-native";
import { Container, ScrollContainer, Text } from "@/styles/container/style";
import MainHeader from "@/components/header/main/header";
import ExpensesIncomes from "@/components/expensesIncomes";
import Cards from "@/components/creditCard/cards";
import { useAuth } from "@/contexts/AuthContext";
import HistoryTransaction from "@/components/transaction/historyTransaction";

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
                <Text fontWeight='500' style={{ marginTop: 15 }}>Meus cartões:</Text>
                <Cards />
                <ExpensesIncomes />
                <HistoryTransaction />
            </ScrollContainer>
        </Container>
    );
}