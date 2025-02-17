import { Animated } from "react-native";

export default {
  primary: "#0ba69c",
  zinc: "#0c0c1b",
  black: "#000",
  white: "#fff",
  green: "#99CF1D",
  gray: "#DDDDDD",
  lightGray: "#d3d3d3",
  darkGray: "#2f2f2f",
};

const handleBlur = (animation: Animated.Value, value: string) => {
  if (!value) {
    Animated.timing(animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }
};

const handleFocus = (animation: Animated.Value): void => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 150,
    useNativeDriver: false,
  }).start();
};

const getFloatingLabelStyle = (animation: Animated.Value) => ({
  top: animation.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -10],
  }),
  fontSize: animation.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  }),
});

export { handleFocus, handleBlur, getFloatingLabelStyle };
