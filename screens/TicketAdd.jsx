import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLink } from "../state/links";
import { Text, Button, Surface } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTicket } from "../state/tickets";

function diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return diff.toFixed(2);

}

const TicketAdd = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const links = useSelector((state) => state.links.links);
    const linkList = links.map(l => ({ label: l.name, value: l.id }));

    const [ticket, setTicket] = React.useState({
        id: new Date().toISOString(),
        link: "",
        vendorId: "",
        startAt: new Date(),
        endAt: new Date()
    });

    const linkId = route.params?.linkId;

    console.log(linkId, ticket);

    React.useEffect(() => {
        if (linkId) {
            setTicket({
                id: new Date().toISOString(),
                link: links.find(l => l.id === linkId).id,
                vendorId: links.find(l => l.id === linkId).vendorId,
                startAt: new Date(),
                endAt: new Date()
            })
        }
    }, [linkId]);

    const [showDropDown, setShowDropDown] = React.useState(false);

    const handleSave = () => {
        dispatch(addTicket(ticket));
        navigation.goBack();
    }

    const [isStart, setIsStart] = React.useState(true);
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        isStart ? setTicket({ ...ticket, startAt: selectedDate }) : setTicket({ ...ticket, endAt: selectedDate });
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (entity) => {
        entity === "start" ? setIsStart(true) : setIsStart(false);
        showMode('date');
    };

    const showTimepicker = (entity) => {
        entity === "start" ? setIsStart(true) : setIsStart(false);
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flex: 1, flexDirection: "column", gap: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>Link</Text>
                    <View style={{ flex: 1 }}>
                        <DropDown
                            label={"Select Link"}
                            mode={"outlined"}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={ticket.link}
                            setValue={(e) => setTicket((p) => ({ ...p, link: e, vendorId: links.find(l => l.id === e).vendorId }))}
                            list={linkList}
                        />
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>Start Time</Text>
                    <View style={{ flex: 1, display: "flex", flexDirection: "row", borderStyle: "solid", borderWidth: 1, borderColor: "#938f97", borderRadius: 4, height: 50, alignItems: "center" }}>
                        <Button onPress={() => showDatepicker("start")}>{ticket.startAt?.toLocaleDateString()}</Button>
                        <Text> | </Text>
                        <Button onPress={() => showTimepicker("start")}>{ticket.startAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Button>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>End Time</Text>
                    <View style={{ flex: 1, display: "flex", flexDirection: "row", borderStyle: "solid", borderWidth: 1, borderColor: "#938f97", borderRadius: 4, height: 50, alignItems: "center" }}>
                        <Button onPress={() => showDatepicker("end")}>{ticket.endAt?.toLocaleDateString()}</Button>
                        <Text> | </Text>
                        <Button onPress={() => showTimepicker("end")}>{ticket.endAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Button>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 30, justifyContent: "center" }}>
                    <Surface style={styles.surface} elevation={2}>
                        <Text >Total Downtime:  </Text><Text variant="labelLarge" style={{ color: "indigo" }}>{diff_hours(ticket.endAt, ticket.startAt)}</Text><Text>  Hours</Text>
                    </Surface>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={isStart ? ticket.startAt : ticket.endAt}
                        mode={mode}
                        is24Hour={false}
                        onChange={onChange}
                    />
                )}

            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <Button style={{ width: "70%" }} mode="contained" onPress={handleSave}>
                    Save
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    surface: {
        padding: 8,
        height: 80,
        width: "70%",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TicketAdd;
