import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import TabRoutes from './tab.routes';

const Routes = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    </View>
  );
};

export default Routes;
