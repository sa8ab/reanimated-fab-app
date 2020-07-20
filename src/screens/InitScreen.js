import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const InitScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar translucent />
      <TouchableOpacity
        style={s.item}
        onPress={() => navigation.navigate('Floating')}>
        <Text>Floating Action Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InitScreen;

const s = StyleSheet.create({
  item: {
    backgroundColor: '#f39c12',
    padding: 10,
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
});
