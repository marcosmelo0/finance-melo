import React from "react";
import { Container } from "@/styles/container/style";
import MainHeader from "@/components/header/main/header";
import ExpensesIncomes from "@/components/cards/expensesIncomes";
import Carts from "@/components/cards/carts";

export default function Home() {

    return (
        <Container>
            <MainHeader />
            <Carts />
            <ExpensesIncomes />
        </Container>
    )
}