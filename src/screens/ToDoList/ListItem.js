import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';
const ListItem = ({item, onPressEdit, ondeletePressed}) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.textareaConatiner}>
        <Text>{item?.title}</Text>
        <Text>{item?.description}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <CustomButton on_touch={onPressEdit} loader={false} text={'Edit'} />
        </View>
        <View style={{flex: 1}}>
          <CustomButton
            on_touch={ondeletePressed}
            item={item}
            loader={false}
            text={'Delete'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: 'pink',
  },
  textareaConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
