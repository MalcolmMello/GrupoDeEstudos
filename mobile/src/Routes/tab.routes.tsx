import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import MyMeetings from '../screens/MyMeetings';
import NewMeeting from '../screens/NewMeeting';
import ScheduledMeetings from '../screens/ScheduledMeetings';
import SignUp from '../screens/SignUp';

export type RootStackParams = {
  bottomBar: any;
  home: any;
  scheduledmeetings: any;
  mymeetings: any;
  newmeeting: any;
  login: any;
  signup: any;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParams>();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0ea5e9',
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={32} />,
        }}
      />
      <Tab.Screen
        name="scheduledmeetings"
        component={ScheduledMeetings}
        options={{
          tabBarLabel: 'Reuniões Marcadas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="mymeetings"
        component={MyMeetings}
        options={{
          tabBarLabel: 'Minhas Reuniões',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-library-books" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="newmeeting"
        component={NewMeeting}
        options={{
          tabBarLabel: 'Criar Reunião',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-library-add" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;

export function AppRoutes() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          {/* <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={SignUp} /> */}
          <Stack.Screen name="bottomBar" component={TabRoutes} options={{ headerShown: false }} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
