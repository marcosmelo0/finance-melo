import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfigTransactions = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', bottom: 55 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold'
            }}
            text2Style={{
                fontSize: 13,
                color: 'gray'
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold',
            }}
            text2Style={{
                fontSize: 13,
                color: 'gray'
            }}
        />
    )
};