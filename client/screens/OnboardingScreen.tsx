import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { useCards } from "../hooks/useCardContext";
import { PrimaryButton } from "../components/PrimaryButton";

const abstract1 = require("../../assets/images/abstract1.png");
const abstract2 = require("../../assets/images/abstract2.png");
const abstract3 = require("../../assets/images/abstract3.png");

const { width, height } = Dimensions.get("window");

// Three fixed slots (original positions: top-right, bottom-right, middle-left)
const SLOT_A = {
  left: width * 0.5,
  top: -height * 0.15,
  w: width * 0.4,
  h: height * 0.4,
};
const SLOT_B = {
  left: width * 0.7,
  top: height * 0.1,
  w: width * 0.42,
  h: height * 0.42,
};
const SLOT_C = {
  left: -width * 0.1,
  top: height * 0.05,
  w: width * 0.4,
  h: height * 0.4,
};

// For each slide (0..3), which slot each image goes to (cyclic swap)
const IMG1_SLOTS = [SLOT_A, SLOT_B, SLOT_C, SLOT_A]; // abstract1
const IMG2_SLOTS = [SLOT_B, SLOT_C, SLOT_A, SLOT_B]; // abstract2
const IMG3_SLOTS = [SLOT_C, SLOT_A, SLOT_B, SLOT_C]; // abstract3

const TRANSITION_DURATION = 480;

const BG_DARK = "#151515";
const CTA_BG = "#FFF6D5";
const CTA_TEXT = "#151515";
const SUBTITLE_OPACITY = 0.88;

export const ONBOARDING_PAGES = [
  {
    id: "1",
    title: "You already\nhave great cards",
    subtitle:
      "Using the right card at the right time helps you unlock extra savings every month.",
    cta: "See how it works",
  },
  {
    id: "2",
    title: "Make every\npurchase work harder",
    subtitle:
      "Enter purchase details and instantly see which card gives you the best value.",
    cta: "Show me how",
  },
  {
    id: "3",
    title: "Your card\ndetails stay private",
    subtitle: "We never access card numbers, OTPs, bank accounts, or messages.",
    cta: "Sounds safe",
  },
  {
    id: "4",
    title: "Every recommendation\nis transparent",
    subtitle:
      "We clearly show rewards, offers applied, and exact savings for every decision.",
    cta: "Get Started",
    isLast: true,
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useCards();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideIndex = useSharedValue(0);

  useEffect(() => {
    slideIndex.value = withTiming(activeIndex, {
      duration: TRANSITION_DURATION,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [activeIndex, slideIndex]);

  const animated1 = useAnimatedStyle(() => ({
    position: "absolute",
    left: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG1_SLOTS[0].left,
        IMG1_SLOTS[1].left,
        IMG1_SLOTS[2].left,
        IMG1_SLOTS[3].left,
      ],
    ),
    top: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG1_SLOTS[0].top,
        IMG1_SLOTS[1].top,
        IMG1_SLOTS[2].top,
        IMG1_SLOTS[3].top,
      ],
    ),
    width: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG1_SLOTS[0].w, IMG1_SLOTS[1].w, IMG1_SLOTS[2].w, IMG1_SLOTS[3].w],
    ),
    height: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG1_SLOTS[0].h, IMG1_SLOTS[1].h, IMG1_SLOTS[2].h, IMG1_SLOTS[3].h],
    ),
  }));
  const animated2 = useAnimatedStyle(() => ({
    position: "absolute",
    left: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG2_SLOTS[0].left,
        IMG2_SLOTS[1].left,
        IMG2_SLOTS[2].left,
        IMG2_SLOTS[3].left,
      ],
    ),
    top: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG2_SLOTS[0].top,
        IMG2_SLOTS[1].top,
        IMG2_SLOTS[2].top,
        IMG2_SLOTS[3].top,
      ],
    ),
    width: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG2_SLOTS[0].w, IMG2_SLOTS[1].w, IMG2_SLOTS[2].w, IMG2_SLOTS[3].w],
    ),
    height: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG2_SLOTS[0].h, IMG2_SLOTS[1].h, IMG2_SLOTS[2].h, IMG2_SLOTS[3].h],
    ),
  }));
  const animated3 = useAnimatedStyle(() => ({
    position: "absolute",
    left: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG3_SLOTS[0].left,
        IMG3_SLOTS[1].left,
        IMG3_SLOTS[2].left,
        IMG3_SLOTS[3].left,
      ],
    ),
    top: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [
        IMG3_SLOTS[0].top,
        IMG3_SLOTS[1].top,
        IMG3_SLOTS[2].top,
        IMG3_SLOTS[3].top,
      ],
    ),
    width: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG3_SLOTS[0].w, IMG3_SLOTS[1].w, IMG3_SLOTS[2].w, IMG3_SLOTS[3].w],
    ),
    height: interpolate(
      slideIndex.value,
      [0, 1, 2, 3],
      [IMG3_SLOTS[0].h, IMG3_SLOTS[1].h, IMG3_SLOTS[2].h, IMG3_SLOTS[3].h],
    ),
  }));

  const handleNext = () => {
    const nextIndex = activeIndex + 1;

    if (nextIndex < ONBOARDING_PAGES.length) {
      flatListRef.current?.scrollToOffset({
        offset: width * nextIndex,
        animated: true,
      });
      // setActiveIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  const lastIndexRef = useRef(0);

  const updateIndex = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);

    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      setActiveIndex(index);
    }
  };

  const sh = height * 0.5;
  const maxR = (Math.min(width, sh) / 2) * 0.96;
  const cx = width / 2;
  const cy = sh / 2;

  // useEffect(() => {
  //   slideIndex.value = withTiming(activeIndex, {
  //     duration: TRANSITION_DURATION,
  //     easing: Easing.bezier(0.22, 1, 0.36, 1),
  //   });
  // }, [activeIndex]);

  return (
    <SafeAreaView className="flex-1 overflow-hidden bg-[#151515]">
      <StatusBar barStyle="light-content" />

      {/* Skip – top-right, hidden on last screen */}
      {activeIndex < ONBOARDING_PAGES.length - 1 && (
        <TouchableOpacity
          className="absolute top-0 right-0 z-10 py-3 px-5"
          onPress={completeOnboarding}
          activeOpacity={0.7}
        >
          <Text className="text-sm text-white/45 font-medium">Skip →</Text>
        </TouchableOpacity>
      )}

      {/* Abstract images – upper half */}
      <View
        className="absolute top-0 left-0 right-0 overflow-visible"
        style={{ height: height * 0.5 }}
        pointerEvents="none"
      >
        {/* Concentric circles with gradient – behind shapes */}
        <Svg width={width} height={sh} style={{ position: "absolute", top: 0, left: 0 }}>
          <Defs>
            <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="rgba(45,50,72,0.35)" />
              <Stop offset="50%" stopColor="rgba(28,30,42,0.12)" />
              <Stop offset="100%" stopColor="rgba(15,15,22,0)" />
            </LinearGradient>
            <RadialGradient id="circleBg" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(75,85,120,0.22)" />
              <Stop offset="50%" stopColor="rgba(55,60,85,0.08)" />
              <Stop offset="100%" stopColor="rgba(35,38,52,0)" />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={width} height={sh} fill="url(#bgGrad)" />
          <Circle cx={cx} cy={cy} r={maxR} fill="url(#circleBg)" />
          <Circle
            cx={cx}
            cy={cy}
            r={maxR * 0.82}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={maxR * 0.62}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={1}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={maxR * 0.42}
            stroke="rgba(255,255,255,0.045)"
            strokeWidth={1}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={maxR * 0.24}
            stroke="rgba(255,255,255,0.035)"
            strokeWidth={1}
            fill="none"
          />
        </Svg>
        {/* Top right – C-shaped (light blue/white) */}
        <Animated.View style={animated1}>
          <Image source={abstract1} className="w-full h-full" resizeMode="contain" />
        </Animated.View>
        {/* Bottom right – bean (yellow/cream) */}
        <Animated.View style={animated2}>
          <Image source={abstract2} className="w-full h-full" resizeMode="contain" />
        </Animated.View>
        {/* Middle left – spiral (pink/off-white) */}
        <Animated.View style={animated3}>
          <Image source={abstract3} className="w-full h-full" resizeMode="contain" />
        </Animated.View>
      </View>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateIndex}
        onScroll={updateIndex}
        onScrollEndDrag={updateIndex}
        renderItem={({ item }) => (
          <View
            className="px-7 justify-start"
            style={{ width, paddingTop: height * 0.55 }}
          >
            <Text className="text-[32px] leading-[42px] font-semibold text-white text-left mb-4">
              {item.title}
            </Text>
            <Text
              className="text-base font-normal text-left"
              style={{ lineHeight: 26, color: `rgba(255,255,255,${SUBTITLE_OPACITY})` }}
            >
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      {/* CTA – pill, bottom */}
      <View className="px-6 pb-6">
        <PrimaryButton
          onPress={handleNext}
          backgroundColor={CTA_BG}
          textColor={CTA_TEXT}
        >
          {ONBOARDING_PAGES[activeIndex].cta}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
