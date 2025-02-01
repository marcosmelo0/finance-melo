import { Container } from "@/app/styles";
import { Logo, Slogan } from "../auth/styles";

export default function MainHeader() {
    return (
        <Container>
            <Logo source={require('@/assets/images/splash_logo.png')} />
            <Slogan>Header</Slogan>
        </Container>
    );
}