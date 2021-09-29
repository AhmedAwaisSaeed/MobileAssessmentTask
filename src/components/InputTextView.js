import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import {INPUT_FONT_SIZE, INPUT_TEXT_COLOR} from '../utils/ConstantClass';

const InputTextView = ({
  onChangeText,
  value,
  placeholder,
  password = false,
}) => {
  const [passwordNotShow, setPasswordNotShow] = useState(true);

  return (
    <View style={styles.mainViewStyle}>
      <View style={[styles.InputTextView]}>
        <TextInput
          style={[styles.InputTextStyle]}
          placeholderTextColor="#545454"
          onChangeText={value => onChangeText(value)}
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          // keyboardType="number-pad"
          secureTextEntry={
            passwordNotShow && password ? passwordNotShow : false
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    height: verticalScale(50),
    // backgroundColor:"red",
    borderWidth: 1.5,
    flexDirection: 'row',
    borderColor: INPUT_TEXT_COLOR,
    paddingRight: moderateScale(15),
  },
  InputTextView: {
    flex: 1,
    paddingLeft: moderateScale(15),
    // height:"75%",
    // backgroundColor:"yellow",
    // borderWidth:1,borderRadius:8,
    // borderColor:"#E5E5E5",

    // marginTop:"1%"
  },
  InputTextStyle: {
    flex: 1,
    // fontFamily: 'Poppins-Italic',
    fontSize: INPUT_FONT_SIZE,
    color: '#000000',
    padding: 0,
    // fontFamily:"Roboto",

    //  marginTop:4,
    //  height:"99%",
    // width:"100%",
    // paddingTop:2,

    //  backgroundColor: 'grey',
  },
  labelTextStyle: {
    color: '#080808',
    fontSize: INPUT_FONT_SIZE,
    // fontFamily:"Roboto"
  },
});

export default InputTextView;
