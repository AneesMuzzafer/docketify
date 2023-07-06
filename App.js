import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './state/store';

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
}
