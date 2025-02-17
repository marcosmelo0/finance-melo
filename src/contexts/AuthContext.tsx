import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

export interface Expense {
    user_id: string;
    title: string;
    value: number;
    category: string;
    date: Date;
    type_payment: string;
};

export interface Income {
    user_id: string;
    title: string;
    value: number;
    category: string;
    date: Date;
};

export interface Card {
    user_id: string;
    name: string;
    limit: number;
    current_limit: number;
    due_date: Date;
    bank: string;
    flag: string;
};

export interface AuthContextProps {
    user: {
        user_id: string;
        balance: number;
        name: string;
        email: string | undefined;
        image: string | null;
        expenses: Expense[];
        incomes: Income[];
        cards: Card[];
    } | null;
    setAuth: (authUser: User | null) => void;
    refreshUser: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextProps['user']>(null);

    async function fetchUserData(table: string, userId: string) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('user_id', userId);
        if (error) {
            console.error(`Erro ao buscar dados de ${table}:`, error);
            return null;
        }
        return data;
    }

    async function fetchUser(userId: string) {
        const { data: userData, error: userError } = await supabase
            .from('users_profile')
            .select('id, name, image, balance')
            .eq('user_id', userId)
            .single();
        if (userError) {
            console.error("Erro ao buscar usuário:", userError);
            return null;
        }

        const expensesData = await fetchUserData('expenses', userId);
        const incomesData = await fetchUserData('incomes', userId);
        const cardsData = await fetchUserData('cards', userId);
        return { ...userData, expenses: expensesData, incomes: incomesData, cards: cardsData || [] };
    }

    async function setAuth(authUser: User | null) {
        if (authUser) {
            const userData = await fetchUser(authUser.id);
            if (userData) {
                setUser({
                    user_id: authUser.id,
                    name: userData.name,
                    email: authUser.email,
                    image: userData.image,
                    expenses: userData.expenses || [],
                    incomes: userData.incomes || [],
                    cards: userData.cards,
                    balance: userData.balance
                });
            } else {
                console.error("User data is null");
            }
        } else {
            setUser(null);
        }
    }

    const refreshUser = async () => {
        if (user) {
            const updatedUser = await fetchUser(user.user_id);
            if (updatedUser) {
                setUser({
                    user_id: user.user_id,
                    name: updatedUser.name,
                    email: user.email,
                    image: updatedUser.image,
                    expenses: updatedUser.expenses || [],
                    incomes: updatedUser.incomes || [],
                    cards: updatedUser.cards,
                    balance: updatedUser.balance
                });
            }
        }
    };

    useEffect(() => {
        if (user) {

            const subscribeToChanges = (table: string, filterColumn: string = 'user_id') => {
                return supabase
                    .channel(`public:${table}`)
                    .on('postgres_changes',
                        { event: '*', schema: 'public', table, filter: `${filterColumn}=eq.${user.user_id}` },
                        async (payload) => {

                            const updatedUser = await fetchUser(user.user_id);
                            if (updatedUser) {
                                console.log(updatedUser)
                                setUser(prevUser => {
                                    if (!prevUser) return prevUser;

                                    return {
                                        ...prevUser,
                                        expenses: updatedUser.expenses || prevUser.expenses,
                                        incomes: updatedUser.incomes || prevUser.incomes,
                                        cards: updatedUser.cards || prevUser.cards,
                                        balance: updatedUser.balance
                                    };
                                });
                            }
                        }
                    )
                    .subscribe();
            };

            const expensesSubscription = subscribeToChanges('expenses');
            const incomesSubscription = subscribeToChanges('incomes');
            const cardsSubscription = subscribeToChanges('cards');

            return () => {
                supabase.removeChannel(expensesSubscription);
                supabase.removeChannel(incomesSubscription);
                supabase.removeChannel(cardsSubscription);
            };
        } else {
            console.log('Nenhum usuário detectado');
        }
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, setAuth, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
