import HomeScreen from '@/app/index';
import ProfileScreen from '@/app/profile';
import OnboardingScreen from '@/app/onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={ OnboardingScreen } />
      <Stack.Screen name="index" component={ HomeScreen } />
      <Stack.Screen name="profile" component={ ProfileScreen } />
    </Stack.Navigator>
  );
}
