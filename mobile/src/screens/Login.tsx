import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import BackButton from '../components/Buttons/BackButton';

const Login = ({ navigation }) => {
  function handlePress() {
    navigation.navigate('home');
  }

  return (
    <View className="p-4 bg-white h-screen w-full">
      <ScrollView className="space-y-10">
        <BackButton />
        <Text className="text-3xl font-semibold text-center">Login</Text>
        <View className="gap-4 ">
          <Text className="font-semibold pl-1">Email</Text>
          <TextInput className="bg-slate-100 rounded-xl p-4 " placeholder="email@gmail.com" />
          <Text className="font-semibold pl-1">Senha</Text>
          <TextInput className="bg-slate-100 rounded-xl p-4" placeholder="********" />
        </View>
        <View className="gap-4 pt-24">
          <TouchableOpacity className="p-5 bg-sky-500 rounded-xl" onPress={handlePress}>
            <Text className="font-semibold text-white text-center">Login</Text>
          </TouchableOpacity>
          <Text className="text-center">ou</Text>
          <TouchableOpacity className="p-5 border-2 border-sky-500 rounded-xl">
            <Text className="font-bold text-sky-500 text-center">Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
