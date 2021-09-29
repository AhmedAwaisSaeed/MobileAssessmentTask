import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import InputTextView from '../../components/InputTextView';
import CustomButton from '../../components/Buttons/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  _createTodo,
  _todoListUser,
  _setCurrentItems,
} from '../../store/actions/ActionTodoList';

const CreateToDo = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.AuthReducer);
  const {createTodoResponse} = useSelector(state => state.TodoListReducer);
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [loader, setLoader] = useState(false);

  const createPressed = () => {
    setLoader(true);
    dispatch(_createTodo({title, description}, token));
  };

  useEffect(() => {
    if (createTodoResponse !== undefined) {
      if (createTodoResponse?.success) {
        if (loader) {
          alert('Todo Created');
          navigation.navigate('ToDoList');

          dispatch(_todoListUser(token));
          dispatch(_setCurrentItems(undefined));
        }
        setLoader(false);
        clearFields();
      } else {
        setLoader(false);
        let error = createTodoResponse.error ?? createTodoResponse.message;
        alert(error);
      }
    }
  }, [createTodoResponse]);

  const clearFields = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{flex: 1}}>
        <View style={{margin: 10, marginTop: 20}}>
          <InputTextView
            onChangeText={setTitle}
            value={title}
            placeholder="title"
          />
        </View>
        <View style={{margin: 10}}>
          <InputTextView
            onChangeText={value => setDescription(value)}
            value={description}
            placeholder="description"
          />
        </View>
        <CustomButton
          on_touch={createPressed}
          loader={loader}
          text={'Create'}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateToDo;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
});
