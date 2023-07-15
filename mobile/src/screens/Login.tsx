import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';

import { RootStackParams } from '../Routes/tab.routes';
import { ILogin } from '../types/Login';

const schema = yup.object({
  email: yup.string().required('Informe o email.').email(),
  password: yup
    .string()
    .required('Informe a senha')
    .min(8, {
      message: 'Senha inválida. A senha deve ter pelo menos 8 caracteres.',
    })
    .max(100, { message: 'A senha deve conter no máximo 100 caracteres' })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    ),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams, 'home'>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
    setLoading(true);
    console.log(data);
    navigation.navigate('bottomBar', { screen: 'home' });
    setLoading(false);
  };

  return (
    <View className="p-4 bg-white h-screen w-full justify-around">
      <Text className="text-3xl font-semibold text-center">Login</Text>
      <View className="gap-4 p-4  w-screen">
        <Text className="font-semibold text-start mb-2">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <TextInput
              className="bg-slate-100 rounded-xl p-4 w-full"
              onChangeText={onChange}
              placeholder="email@email.com"
            />
          )}
        />
        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
        <Text className="font-semibold pl-1 text-start mb-2">Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <TextInput
              className="bg-slate-100 rounded-xl p-4 w-full"
              placeholder="********"
              secureTextEntry
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
      </View>
      <View className="gap-4 pt-24">
        <TouchableOpacity
          className="p-5 bg-sky-500 rounded-xl"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}>
          <Text className="font-semibold text-white text-center">Login</Text>
        </TouchableOpacity>
        <Text className="text-center">ou</Text>
        <TouchableOpacity className="p-5 border-2 border-sky-500 rounded-xl" disabled={loading}>
          <Text className="font-bold text-sky-500 text-center">Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
