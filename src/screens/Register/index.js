import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import InputTextView from '../../components/InputTextView';
import CustomButton from '../../components/Buttons/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {_registerUser} from '../../store/actions/ActionRegister';
const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const {response} = useSelector(state => state.RegisterReducer);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [loader, setLoader] = useState(false);

  const SignUpPressed = () => {
    if (password && email && confirmPassword) {
      if (password !== confirmPassword) {
        alert('Your password not matched');
      } else {
        setLoader(true);
        dispatch(
          _registerUser({
            email,
            password,
            password_confirmation: confirmPassword,
          }),
        );
      }
    } else {
      alert('Any field should not be empty');
    }
  };

  useEffect(() => {
    if (response !== undefined) {
      if (response?.success) {
        setLoader(false);
        alert(response?.message);
        navigation.navigate('Login');
      } else {
        setLoader(false);
        alert(response?.error);
      }
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{flex: 1}}>
        <View style={[styles.fieldStyle, {marginTop: 20}]}>
          <InputTextView
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={styles.fieldStyle}>
          <InputTextView
            onChangeText={value => setPassword(value)}
            value={password}
            placeholder="Password"
            password={true}
          />
        </View>
        <View style={styles.fieldStyle}>
          <InputTextView
            onChangeText={value => setConfirmPassword(value)}
            value={confirmPassword}
            placeholder="Confirm"
            password={true}
          />
        </View>

        <CustomButton
          on_touch={SignUpPressed}
          loader={loader}
          text={'Sign Up'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  fieldStyle: {
    margin: 10,
  },
});
