import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store';

import Navigator from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
