
import Home from '@/components/Home';
import {Container}  from './styles';
import { ScrollView } from 'react-native';

export default function TabOneScreen() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Home />
      </ScrollView>
    </Container>
  );
}


