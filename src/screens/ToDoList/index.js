import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  _todoListUser,
  _todoSuccess,
  _setCurrentItems,
  _concatItems,
} from '../../store/actions/ActionTodoList';
import {BASE_URL} from '../../utils/ConstantClass';
import InputTextView from '../../components/InputTextView';
import {useNavigation} from '@react-navigation/native';
import ListFooter from './ListFooter';
import ListItem from './ListItem';
const TodoList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {token} = useSelector(state => state.AuthReducer);
  const {response} = useSelector(state => state.TodoListReducer);
  const {items} = useSelector(state => state.TodoListReducer);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [searchData, setSearchData] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    if (response === undefined) {
      dispatch(_todoListUser(token));
    }
  }, []);
  useEffect(() => {
    if (items === undefined) {
      dispatch(_setCurrentItems(response?.items?.data));
      setDeleteLoading(false);
    }
  }, [response]);

  const _renderItem = ({item}) => {
    return (
      <ListItem
        item={item}
        onPressEdit={onPressEdit}
        ondeletePressed={ondeletePressed}
      />
    );
  };

  const getData = () => {
    if (response?.items?.next_page_url) {
      setLoading(true);
      let pageNumber = parseInt(response?.items?.current_page) + 1;
      fetch(BASE_URL + 'items?page=' + pageNumber, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          dispatch(_todoSuccess(responseJson));
          dispatch(_concatItems(responseJson?.items?.data));
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    const nextPage = response?.items?.next_page_url;
    if (nextPage && items?.length > 0) {
      return <ListFooter loading={loading} getData={getData} />;
    } else {
      return <View style={{marginBottom: 30}} />;
    }
  };

  const onPressEdit = () => {
    navigation.navigate('ViewToDo');
  };

  const ondeletePressed = item => {
    setDeleteLoading(true);
    fetch(BASE_URL + 'item/' + item.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson?.success) {
          dispatch(_todoListUser(token));
          dispatch(_setCurrentItems(undefined));
          setSearchTerm('');
          setSearchData([]);
          alert(responseJson.message);
        } else {
          alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const searchFilterFunction = text => {
    const newData = items.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearchData(newData);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{margin: 10, marginTop: 20}}>
        <InputTextView
          onChangeText={searchFilterFunction}
          value={searchTerm}
          placeholder="Search"
        />
      </View>
      {deleteLoading && (
        <View style={{flex: 1}}>
          <ActivityIndicator
            size="large"
            color="blue"
            style={styles.loaderStyle}
          />
        </View>
      )}
      <View style={{flex: 1}}>
        <FlatList
          data={searchData?.length > 0 ? searchData : items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
          ListFooterComponent={renderFooter}
          extraData={items || searchData}
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  loaderStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
