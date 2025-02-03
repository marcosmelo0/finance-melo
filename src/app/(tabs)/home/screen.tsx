import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollContainer } from "@/styles/container/style";
import MainHeader from "@/components/header/main/header";
import ExpensesIncomes from "@/components/cards/expensesIncomes";
import Carts from "@/components/cards/carts";

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <ScrollContainer
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <MainHeader />
            <Carts />
            <ExpensesIncomes />
        </ScrollContainer>
    );
}