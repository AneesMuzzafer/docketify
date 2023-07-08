import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Report from '../screens/Report';


const Stack = createNativeStackNavigator();

const ReportStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Report" component={Report} options={{title: "Report"}}/>
        </Stack.Navigator>
    );
}

export default ReportStack;
