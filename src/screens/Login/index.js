import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import InputTextView from '../../components/InputTextView';
import CustomButton from '../../components/Buttons/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {_loginUser, _setToken} from '../../store/actions/ActionAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {response} = useSelector(state => state.AuthReducer);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loader, setLoader] = useState(false);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('token', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const LoginPressed = () => {
    if (password && email) {
      setLoader(true);
      dispatch(
        _loginUser({
          email,
          password,
        }),
      );
    } else {
      alert('Any field should not be empty');
    }
  };

  useEffect(() => {
    if (response !== undefined) {
      if (response?.success) {
        if (loader) {
          alert('Login Successfully');
          dispatch(_setToken(response?.user?.token));
          storeData(response?.user?.token);
          setLoader(false);
          navigation.navigate('DrawerScreens');
        }
      } else {
        setLoader(false);
        let error = response.error ?? response.message;
        alert(error);
      }
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{flex: 1}}>
        <View style={{margin: 10, marginTop: 20}}>
          <InputTextView
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={{margin: 10}}>
          <InputTextView
            onChangeText={value => setPassword(value)}
            value={password}
            placeholder="Password"
            password={true}
          />
        </View>
        <CustomButton on_touch={LoginPressed} loader={loader} text={'Login'} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
