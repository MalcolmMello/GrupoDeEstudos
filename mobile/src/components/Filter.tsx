import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const Filter = () => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<number>();

  const options = [
    '1º Semestre',
    '2º Semestre',
    '3º Semestre',
    '4º Semestre',
    '5º Semestre',
    '6º Semestre',
  ];

  return (
    <View>
      <SelectDropdown
        data={options}
        defaultButtonText="Filtrar..."
        buttonStyle={styles.Select}
        buttonTextStyle={styles.SelectText}
        dropdownStyle={styles.Dropdown}
        rowTextStyle={styles.rowText}
        dropdownIconPosition="right"
        renderDropdownIcon={(opened) => {
          return <Entypo name={opened ? 'chevron-up' : 'chevron-down'} color="#444" size={18} />;
        }}
        onSelect={(selectedItem, index) => {
          setSelected(index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Select: {
    flex: 1,
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    width: 150,
  },
  SelectText: {
    color: '#475569',
  },
  Dropdown: {
    borderRadius: 8,
    marginTop: -16,
  },
  rowText: {
    color: '#475569',
  },
});

export default Filter;
