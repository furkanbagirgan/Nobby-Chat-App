import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';

import Navigation from './src/navigation';
import store from './src/redux/store';

const App = () => {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
