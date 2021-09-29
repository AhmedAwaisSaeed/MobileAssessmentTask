import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {BUTTON_COLOR, MAIN_COLOR} from '../../utils/ConstantClass';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ScaleFromCenterAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const CustomButton = ({loader, text, on_touch, customStyle, item}) => {
  if (loader === false) {
    return (
      <TouchableOpacity
        onPress={() => (item ? on_touch(item) : on_touch())}
        style={[styles.ButtonView, customStyle]}>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.ButtonView, customStyle]}>
        <ActivityIndicator size="large" color="#ffff" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ButtonView: {
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(30),
    // borderWidth:1,
    // borderRadius:20,
    // borderColor:"#e13a3a",
    backgroundColor: BUTTON_COLOR,

    // marginLeft:10,
    // marginRight:10
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
  },
});

export default CustomButton;
