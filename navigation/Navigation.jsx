import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TicketList from '../screens/TicketList';
import LinkList from '../screens/LinkList';
import LinkStack from './LinkStack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import TicketStack from './TicketStack';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Links" component={LinkStack} options={{ tabBarIcon: "forum" }} />
            <Tab.Screen name="Tickets" component={TicketStack} options={{ tabBarIcon: "wifi" }} />
            <Tab.Screen name="Reports" component={TicketList} options={{ tabBarIcon: "table" }} />
        </Tab.Navigator>
    );
}

export default Navigation;
