import React from "react";
import {
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const PRESSED_SCALE = 0.97;
const DURATION_PRESS_IN_MS = 140;
const DURATION_RELEASE_MS = 160;
const SHADOW_OPACITY_RELEASED = 0.12;
const SHADOW_OPACITY_PRESSED = 0.05;
const SHADOW_RADIUS_RELEASED = 8;
const SHADOW_RADIUS_PRESSED = 5;
const ELEVATION_RELEASED = 3;
const ELEVATION_PRESSED = 1;
const PRESS_DARKEN_OVERLAY = "rgba(0,0,0,0.03)";
const DEFAULT_BG = "#FFF6D5";
const DEFAULT_TEXT = "#151515";

export interface PrimaryButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PrimaryButton({
  onPress,
  children,
  backgroundColor = DEFAULT_BG,
  textColor = DEFAULT_TEXT,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withTiming(PRESSED_SCALE, {
      duration: DURATION_PRESS_IN_MS,
      easing: Easing.out(Easing.cubic),
    });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, {
      duration: DURATION_RELEASE_MS,
      easing: Easing.out(Easing.cubic),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(
      scale.value,
      [PRESSED_SCALE, 1],
      [SHADOW_OPACITY_PRESSED, SHADOW_OPACITY_RELEASED],
    ),
    shadowRadius: interpolate(
      scale.value,
      [PRESSED_SCALE, 1],
      [SHADOW_RADIUS_PRESSED, SHADOW_RADIUS_RELEASED],
    ),
    elevation: interpolate(
      scale.value,
      [PRESSED_SCALE, 1],
      [ELEVATION_PRESSED, ELEVATION_RELEASED],
    ),
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [PRESSED_SCALE, 1], [1, 0]),
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="self-stretch"
    >
      <Animated.View
        className="py-[18px] rounded-full items-center justify-center min-h-[44px]"
        style={[
          { backgroundColor, shadowColor: "#000", shadowOffset: { width: 0, height: 2 } },
          style,
          animatedStyle,
        ]}
      >
        <Animated.View
          className="rounded-full"
          style={[
            { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: PRESS_DARKEN_OVERLAY },
            overlayStyle,
          ]}
          pointerEvents="none"
        />
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = { text: { fontSize: 17, fontWeight: "600" as const } };
