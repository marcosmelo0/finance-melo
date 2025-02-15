import { BaseToast, ErrorToast } from "react-native-toast-message";
import colors from "./colors";
import Icon from "react-native-vector-icons/Feather";

export const toastConfigTransactions = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#00c853',
                borderLeftWidth: 10,
                backgroundColor: 'aliceblue',
                borderRadius: 10,
                margin: 5,
                shadowColor: '#00c853',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                top: 50
            }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.zinc
            }}
            text2Style={{
                fontSize: 14,
                color: colors.zinc
            }}
            renderLeadingIcon={() => (
                <Icon name="check-circle" size={24} color="#00c853" style={{ marginRight: 10 }} />
            )}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: '#d50000',
                borderLeftWidth: 5,
                backgroundColor: '#1b1b1b',
                borderRadius: 10,
                margin: 10,
                shadowColor: '#d50000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                top: 50
            }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'red'
            }}
            text2Style={{
                fontSize: 14,
                color: 'aliceblue'
            }}
            renderLeadingIcon={() => (
                <Icon name="alert-circle" size={24} color="red" style={{ marginRight: 10 }} />
            )}
        />
    )
};