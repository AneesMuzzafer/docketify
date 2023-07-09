import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../components/AddButton";
import { List } from 'react-native-paper';
import { deleteTicket } from "../state/tickets";
import { diff_hours } from "../utils/Utils";

const TicketList = ({navigation}) => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.tickets);
    const links = useSelector(state => state.links.links);

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    tickets.map((t, i) => (
                        <List.Item key={t.id + i}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={links.find(l => l.id === t.link)?.name}
                            description={(new Date(t.startAt).toLocaleString(["en-GB"], {year: "2-digit", month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}) + "  --  " + new Date(t.endAt).toLocaleString(["en-GB"], {year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})) + "   (" + diff_hours(new Date(t.endAt), new Date(t.startAt)) + " hrs)"}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => dispatch(deleteTicket(t.id))}><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            <AddButton label="Add Ticket" onPress={() => navigation.navigate("TicketAddEdit")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default TicketList;
