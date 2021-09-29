import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';
const Welcome = ({navigation}) => {
  const onPressRegister = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.centerContent}>
        <Text style={styles.welcomeTextStyle}>Welcome To Todo App</Text>
      </View>

      <CustomButton
        on_touch={onPressRegister}
        loader={false}
        text={'Register'}
      />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  welcomeTextStyle: {
    fontSize: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
