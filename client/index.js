import { registerRootComponent } from "expo";
import React from 'react';
import OnboardingScreen from './screens/OnboardingScreen';

function App() {
  return <OnboardingScreen />;
}

registerRootComponent(App);