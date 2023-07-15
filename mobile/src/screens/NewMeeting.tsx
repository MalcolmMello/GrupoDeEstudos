import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { View, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { INewMeet } from '../types/NewMeet';

const NewMeeting = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<INewMeet> = (data: INewMeet) => {
    setLoading(true);
    console.log(data);
    ToastAndroid.show('Reunião criada!', ToastAndroid.SHORT);
    setLoading(false);
  };
  return (
    <View className="p-4 bg-slate-100 h-screen w-full justify-around">
      <Text className="text-3xl font-semibold text-center">Criar Reunião</Text>
      <View className="space-y-6">
        <Text className="font-semibold text-start mb-2">Matéria</Text>
        <Controller
          control={control}
          name="materia"
          rules={{
            required: 'Informe a matéria.',
          }}
          render={({ field: { onChange } }) => (
            <>
              <TextInput
                className="bg-slate-200 rounded-xl p-4 w-full"
                onChangeText={onChange}
                placeholder="ex.: Banco de Dados"
              />
            </>
          )}
        />

        <Text className="font-semibold text-start mb-2">Local</Text>
        <Controller
          control={control}
          name="local"
          rules={{
            required: 'Informe o local.',
          }}
          render={({ field: { onChange } }) => (
            <TextInput
              className="bg-slate-200 rounded-xl p-4 w-full"
              onChangeText={onChange}
              placeholder="ex.: Sala de Estudos"
            />
          )}
        />
        <Text className="font-semibold text-start mb-2">Data</Text>
        <Controller
          control={control}
          name="data"
          rules={{
            required: 'Informe a data.',
          }}
          render={({ field: { onChange } }) => (
            <TextInput className="bg-slate-200 rounded-xl p-4 w-full" onChangeText={onChange} />
          )}
        />
        <Text className="font-semibold text-start mb-2">Descrição</Text>
        <Controller
          control={control}
          name="descricao"
          rules={{
            required: 'Informe a descrição.',
          }}
          render={({ field: { onChange } }) => (
            <TextInput
              multiline
              numberOfLines={10}
              onChangeText={onChange}
              className="bg-slate-200 rounded-xl p-4 w-full"
              style={{ height: 120, textAlignVertical: 'top' }}
            />
          )}
        />
      </View>
      <TouchableOpacity
        className="p-5 mb-10 bg-sky-500 rounded-xl"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}>
        <Text className="font-semibold text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewMeeting;
