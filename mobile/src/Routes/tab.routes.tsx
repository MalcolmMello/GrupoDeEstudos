import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import MyMeetings from '../screens/MyMeetings';
import NewMeeting from '../screens/NewMeeting';
import ScheduledMeetings from '../screens/ScheduledMeetings';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
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

export default AppRoutes;
