import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ListFooter = ({loading, getData}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={getData} style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Load More</Text>
        {loading ? (
          <ActivityIndicator color="white" style={{marginLeft: 8}} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    marginHorizontal: '20%',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
