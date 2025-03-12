import colors from "@/constants/colors";
import { Text } from "@/styles/container/style";
import { View } from "react-native";

export default function GoalsScreen() {
    return (

        <View style={{ flex: 1, backgroundColor: colors.zinc }}>
            <Text>Goals</Text>
        </View>
    )
}