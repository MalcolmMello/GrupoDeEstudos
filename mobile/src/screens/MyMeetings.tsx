import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Filter from '../components/Filter';
import MeetItem from '../components/Meet/MeetItem';
import { IMeet } from '../types/Meet';
import { UseApi } from '../utils/MeetApi';

const MyMeetings = () => {
  const [meets, setMeets] = useState<IMeet[]>([]);

  useEffect(() => {
    const fetchMeets = async () => {
      try {
        const api = UseApi();
        const fetchedMeets = await api.getAllMeets();
        setMeets(fetchedMeets);
      } catch (error) {
        console.error('Erro api:', error);
      }
    };

    fetchMeets();
  }, []);

  return (
    <View className="p-4 bg-slate-100">
      <ScrollView>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-2xl text-center text-semibold ">Minhas Reuniões</Text>
          <Filter />
        </View>
        {meets.map((meet, index) => (
          <View className="pt-8" key={index}>
            <MeetItem key={index} {...meet} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyMeetings;
