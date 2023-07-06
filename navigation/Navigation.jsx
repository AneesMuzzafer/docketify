import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TicketList from '../screens/TicketList';
import LinkList from '../screens/LinkList';
import LinkStack from './LinkStack';

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Links" component={LinkStack} />
            <Tab.Screen name="Tickets" component={TicketList} />
        </Tab.Navigator>
    );
}

export default Navigation;
