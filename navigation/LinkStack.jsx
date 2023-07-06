import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinkList from '../screens/LinkList';
import LinkView from '../screens/LinkView';
import LinkAdd from '../screens/LinkAdd';

const Stack = createNativeStackNavigator();

const LinkStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LinkList" component={LinkList} />
            <Stack.Screen name="LinkView" component={LinkView} />
            <Stack.Screen name="LinkAdd" component={LinkAdd} />
        </Stack.Navigator>
    );
}

export default LinkStack;
