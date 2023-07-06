import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

const BackButton = () => {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goBack}
      className="w-12 h-12 items-center justify-center bg-slate-100 rounded-2xl">
      <Feather name="arrow-left" size={32} color={colors.sky[500]} />
    </TouchableOpacity>
  );
};

export default BackButton;
