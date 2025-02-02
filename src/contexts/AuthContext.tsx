import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

export interface Expense {
    user_id: string;
    title: string;
    value: number;
    category: string;
    date: Date;
};

export interface Income {
    user_id: string;
    title: string;
    value: number;
    category: string;
    date: Date;
};

export interface Cart {
    user_id: string;
    name: string;
    limit: number;
    current_limit: number;
    due_date: Date;
    bank: string;
    flag: string;
};

interface AuthContextProps {
    user: {
        id: string;
        name: string;
        email: string | undefined;
        image: string | null;
        expenses: Expense[];
        incomes: Income[];
        cart: Cart | null;
    } | null;
    setAuth: (authUser: User | null) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<AuthContextProps['user']>(null);

    async function fetchUser(userId: string) {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select(`
                id,
                name,
                image
            `)
            .eq('id', userId)
            .single();
        if (userError) {
            console.error("Erro ao buscar usuário:", userError);
            return null;
        }

        const { data: expensesData, error: expensesError } = await supabase
            .from('expenses')
            .select('*')
            .eq('user_id', userId);
        if (expensesError) {
            console.error("Erro ao buscar despesas:", expensesError);
            return null;
        }

        const { data: incomesData, error: incomesError } = await supabase
            .from('incomes')
            .select('*')
            .eq('user_id', userId);
        if (incomesError) {
            console.error("Erro ao buscar receitas:", incomesError);
            return null;
        }

        const { data: cartData, error: cartError } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (cartError) {
            console.error("Erro ao buscar carrinho:", cartError);
            return null;
        }

        return { ...userData, expenses: expensesData, incomes: incomesData, cart: cartData };
    }

    async function setAuth(authUser: User | null) {
        if (authUser) {
            const userData = await fetchUser(authUser.id);
            if (userData) {
                setUser({
                    id: authUser.id,
                    name: userData.name,
                    email: authUser.email,
                    image: userData.image,
                    expenses: userData.expenses,
                    incomes: userData.incomes,
                    cart: userData.cart
                });
            } else {
                console.error("User data is null");
            }
        } else {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);