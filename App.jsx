import { StyleSheet, View } from 'react-native';
import Welcome from './js/Log/Welcome';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducer1 from './reducers/reducer1';

const rootReducer = combineReducers({
  reducer1,
});

// Create the Redux store
const store = createStore(rootReducer);

export default function App() { 
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Welcome />
      </View> 
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
