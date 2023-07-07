import React from 'react';
import { View, Text } from 'react-native';

import { IMeet } from '../../types/Meet';
import ButtonCancel from '../Buttons/ButtonCancel';
import ButtonConfirm from '../Buttons/ButtonConfirm';

const MeetItem = (meet: IMeet) => {
  return (
    <View className="bg-white rounded-lg p-6 justify-between h-56">
      <View className="flex-row items-center justify-between">
        <Text className="font-semibold text-base">{meet.organizador}</Text>
        {meet.ativo ? (
          <Text className="bg-green-300 rounded-full px-3 py-2 text-green-600">Ativo</Text>
        ) : (
          <Text className="bg-red-300 rounded-full px-3 py-2 text-red-600">Inativo</Text>
        )}
      </View>
      <View className="gap-3">
        <Text className="font-semibold text-base">{meet.materia}</Text>
        <Text>{meet.descricao}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>
          <Text className="font-semibold">{meet.qtdPessoas}</Text> Pessoas inscritas
        </Text>
        {meet.marcado ? <ButtonCancel /> : <ButtonConfirm />}
      </View>
    </View>
  );
};

export default MeetItem;
