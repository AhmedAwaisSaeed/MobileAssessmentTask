import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const BASE_URL = 'http://54.144.155.145/api/';

//Icons

const MENU_ICON = require('../assets/menu.png');
const BACK_ICON = require('../assets/back.png');

//Main Colors

const MAIN_COLOR = '#345EF5';
//Header Color
const HEADER_TEXT_COLOR = '#181819';
const HEADER_FONT_SIZE = moderateScale(20);

// INPUT fields

const INPUT_TEXT_COLOR = '#969797';
const INPUT_FONT_SIZE = moderateScale(14);

//SIMPLE SCREEN TEXT
const SIMPLE_TEXT_COLOR = '#FFFF';
const SIMPLE_TEXT_SIZE = moderateScale(14);

// Button Colors
const BUTTON_COLOR = '#345EF5';

// CARDS

const GLOBALSTYLES = StyleSheet.create({
  CARD_VIEW_STYLE: {
    shadowColor: 'rgba(0, 0, 0, 0.19)',
    shadowOffset: {width: 0, height: 17},

    // borderWidth:1.8,

    elevation: 12,

    shadowRadius: 13,
    shadowOpacity: 1,
    borderStyle: 'solid',
    // borderWidth: 2,

    // paddingLeft:15,
    // paddingRight:10,
    // marginTop:5,
    padding: moderateScale(5),
    // overflow: 'hidden',
    //   flex: 1,
    //  flex: 1,

    // height:verticalScale(300),
    // alignItems:"center",
    // justifyContent:"center",

    // marginLeft:10,
    // marginRight:10,

    backgroundColor: '#FFFF',
    borderColor: MAIN_COLOR,
    borderWidth: 0.5,
    borderRadius: moderateScale(15),
    // paddingBottom:20,
    // marginBottom:20
  },

  BUTTON_TEXT_CLASS: {
    color: '#ffff',
    fontSize: moderateScale(15),
  },
  CENTERSTYLE: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  BLACK_HEADER_HEADING: {
    color: '#010102',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },

  BLUE_LABEL_TEXT: {
    color: '#5267F8',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },

  WHITE_COLOR_TEXT: {
    color: '#FFFF',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
});

export {
  HEADER_FONT_SIZE,
  HEADER_TEXT_COLOR,
  INPUT_FONT_SIZE,
  INPUT_TEXT_COLOR,
  SIMPLE_TEXT_COLOR,
  SIMPLE_TEXT_SIZE,
  BUTTON_COLOR,
  GLOBALSTYLES,
  MENU_ICON,
  BASE_URL,
  BACK_ICON,
  MAIN_COLOR,
};
