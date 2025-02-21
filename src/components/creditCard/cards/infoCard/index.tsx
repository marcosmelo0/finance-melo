import { useAuth } from '@/contexts/AuthContext';
import { Text } from '@/styles/container/style';
import { View } from 'react-native';
import { DivCard, ImageCard } from '../styles';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ContainerCard } from './styles';

export default function InfoCardComponent({ cardId }: { cardId: number }) {
    const { user } = useAuth();
    const card = user?.cards.filter(card => card.id === cardId)[0];

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
                return { topPosition: 10, bottomPosition: 95, leftPosition: 75 };
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
    const month = '10';
    const year = '2023';

    return (
        <ContainerCard>

            <DivCard>
                <ImageCard source={cardImage} />
                <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', top: topPosition + 15, left: leftPosition, width: '50%' }}>
                    <Text fontWeight='bold'>Limite: <Text>{formattedLimit}</Text></Text>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', top: topPosition + 40, left: leftPosition, width: '65%' }}>
                    <Text fontWeight='bold'>Disponível: <Text>{formattedCurrentLimit}</Text></Text>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition, left: leftPosition, width: '65%' }}>
                    <Text fontWeight='bold'>{card.name.toUpperCase()}</Text>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 25, left: leftPosition, width: '20%' }}>
                    <Text fontWeight='500'>Fatura:</Text>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder visible={!loading} style={{ position: 'absolute', bottom: bottomPosition - 50, left: leftPosition, width: '30%' }}>
                    <Text>{card.due_date}/{month}/{year}</Text>
                </ShimmerPlaceholder>
            </DivCard>

        </ContainerCard>
    );
}
