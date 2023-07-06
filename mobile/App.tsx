import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Routes from './src/Routes';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <Routes />
      <StatusBar backgroundColor="#f1f5f9" translucent />
    </SafeAreaView>
  );
}
