import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TicketList from '../screens/TicketList';
import TicketAdd from '../screens/TicketAdd';

const Stack = createNativeStackNavigator();

const TicketStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TicketList" component={TicketList} options={{title: "Tickets"}}/>
            <Stack.Screen name="TicketAddEdit" component={TicketAdd} options={{title: "Update Ticket"}}/>
        </Stack.Navigator>
    );
}

export default TicketStack;
