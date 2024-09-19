import {NavigationContainer} from '@react-navigation/native';

import Navigator from './routes';
import {CartProvider} from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </CartProvider>
  );
}
