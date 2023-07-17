import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View className="h-12 bg-white w-full p-3 flex-row justify-around absolute bottom-0">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home' as never);
        }}>
        <MaterialIcons name="home" size={24} className="text-slate-300 " />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('scheduledmeetings' as never);
        }}>
        <MaterialIcons name="people-alt" size={24} className="text-slate-300 " />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('mymeetings' as never);
        }}>
        <MaterialIcons name="my-library-books" size={24} className="text-slate-300 " />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('newmeeting' as never);
        }}>
        <MaterialIcons name="my-library-add" size={24} className="text-slate-300 " />
      </TouchableOpacity>
    </View>
  );
};
export default BottomBar;
