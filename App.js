import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './state/store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </Provider>
    );
}
