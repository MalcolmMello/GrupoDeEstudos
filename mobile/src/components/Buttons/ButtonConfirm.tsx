import React, { useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

const ButtonConfirm = () => {
  const [opened, setOpened] = useState(false);

  function showToast() {
    ToastAndroid.show('Reunião marcada!', ToastAndroid.SHORT);
    setOpened(false);
  }

  return (
    <View className="">
      <TouchableOpacity
        className="px-4 py-2 rounded-md bg-sky-500"
        onPress={() => (opened ? setOpened(false) : setOpened(true))}>
        <Text className="text-white font-medium">Marcar</Text>
      </TouchableOpacity>
      {opened && (
        <View className="bg-sky-500 h-48 w-80 p-4 absolute right-2 rounded-lg justify-between -bottom-2">
          <Text className="font-semibold text-2xl text-white">Desmarcar</Text>
          <Text className="text-white">Você realmente deseja marcar essa reunião?</Text>
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity
              className="border-2 border-sky-600 rounded-md"
              onPress={() => setOpened(false)}>
              <Text className="text-white text-center px-4 py-2">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-sky-600 rounded-md justify-center" onPress={showToast}>
              <Text className="text-white text-center px-4">Marcar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ButtonConfirm;
