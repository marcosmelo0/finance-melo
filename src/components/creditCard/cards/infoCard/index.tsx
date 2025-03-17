import { useAuth } from '@/contexts/AuthContext';
import { Text } from '@/styles/container/style';
import { TouchableOpacity, View } from 'react-native';
import { DivCard, ImageCard } from '../styles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ContainerCard, DivInvoices } from './styles';
import colors from '@/constants/colors';
import Toast from 'react-native-toast-message';
import { toastConfigTransactions } from '@/constants/toastconfigs';
import React from 'react';
import { DivCashFlow } from '@/components/transactions/styles';

export default function InfoCardComponent({ cardId }: { cardId: number }) {
    const { user } = useAuth();
    const card = user?.cards.filter(card => card.id === cardId)[0];
    const invoices = user?.invoices;



    const getCardImage = (bank: string): any => {
        switch (bank) {
            case 'Nubank':
                return require('@/assets/images/card_nubank.png');
            case 'Inter':
                return require('@/assets/images/card_inter.png');
            case 'Brasil Card':
                return require('@/assets/images/brasil_card.png');
            default:
                return require('@/assets/images/add_cart.png');
        }
    };

    const getCardStyles = (bank: string) => {
        switch (bank) {
            case 'Nubank':
                return { topPosition: 15, bottomPosition: 70, leftPosition: 75 };
            case 'Inter':
                return { topPosition: 10, bottomPosition: 85, leftPosition: 75 };
            case 'Brasil Card':
                return { topPosition: 0, bottomPosition: 62, leftPosition: 20 };
            default:
                return { topPosition: 15, bottomPosition: 90, leftPosition: 75 };
        }
    };


    if (!card) {
        return <View><Text>Cartão não encontrado</Text></View>;
    }

    const cardImage = getCardImage(card.bank);
    const { topPosition, bottomPosition, leftPosition } = getCardStyles(card.bank);
    const loading = false;
    const formattedLimit = card.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formattedCurrentLimit = card.current_limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const year = new Date().getUTCFullYear();
    const currentDate: number = new Date().getDate();
    const isOverdue = currentDate > Number(card.due_date);


    const currentMonthInvoices = invoices?.filter(invoice => {
        const invoiceMonth = new Date(invoice.month).getMonth() + 1;
        return invoiceMonth === parseInt(month);
    });


    return (
        <>
            <ContainerCard>
                <DivCard>
                    <ImageCard source={cardImage} />
                    <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', top: topPosition + 15, left: leftPosition, width: '50%' }}>
                        <Text fontWeight='bold'>Limite: <Text>{formattedLimit}</Text></Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', top: topPosition + 40, left: leftPosition, width: '65%' }}>
                        <Text fontWeight='bold'>Disponível: <Text>{formattedCurrentLimit}</Text></Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition + 5, left: leftPosition, width: '65%' }}>
                        <Text fontWeight='bold'>{card.name.toUpperCase()}</Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 20, left: leftPosition, width: '20%' }}>
                        <Text fontWeight='500'>Fatura:</Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 45, left: leftPosition, width: '30%' }}>
                        <Text >{card.due_date}/{month}/{year}</Text>
                    </ShimmerPlaceholder>
                    {isOverdue && (
                        <View style={{ borderRadius: 3, paddingHorizontal: 5, position: 'absolute', left: leftPosition, bottom: bottomPosition - 68, backgroundColor: colors.gray }}>
                            <Text size={12} style={{ color: 'red' }}>Em atraso!</Text>
                        </View>

                    )}
                </DivCard>
                <Toast config={toastConfigTransactions} />
            </ContainerCard>
            <DivInvoices>
                {currentMonthInvoices && currentMonthInvoices.length > 0 ? (
                    currentMonthInvoices.map((invoice, index) => {
                        const formattedInvoiceValue = invoice.value.toLocaleString('pt-BR', {
                            style: 'currency', currency: 'BRL'
                        });
                        return (


                            <View key={index}>
                                <Text>Fatura Atual:</Text>
                                <Text> {formattedInvoiceValue}</Text>
                            </View>

                        );
                    })
                ) : (
                    <Text>Não há faturas disponíveis para esse mês! 😊</Text>
                )}
                <TouchableOpacity>
                    <Text style={{ color: 'aliceblue', backgroundColor: colors.primary, borderRadius: 5, padding: 10 }}>Pagar Fatura</Text>
                </TouchableOpacity>
            </DivInvoices>
        </>
    );
}
