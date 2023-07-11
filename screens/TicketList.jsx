import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../components/AddButton";
import { List } from 'react-native-paper';
import { deleteTicket } from "../state/tickets";
import { diff_hours } from "../utils/Utils";
import useConfirmation from "../components/useConfirmation";
import ConfirmationModal from "../components/ConfirmationModal";

const TicketList = ({ navigation }) => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.tickets);
    const links = useSelector(state => state.links.links);

    const confirmation = useConfirmation();

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    tickets.map((t, i) => (
                        <List.Item key={t.id + i}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={links.find(l => l.id === t.link)?.name}
                            description={(new Date(t.startAt).toLocaleString(["en-GB"], { year: "2-digit", month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + "  --  " + new Date(t.endAt).toLocaleString(["en-GB"], { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })) + "   (" + diff_hours(new Date(t.endAt), new Date(t.startAt)) + " hrs)"}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => confirmation.show(t.id)}><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            <ConfirmationModal
                confirmation={confirmation}
                title="Do you want to delete this ticket?"
                content="This action is irreversible!"
                onConfirm={(id) => { dispatch(deleteTicket(id)); }}
                onCancel={() => console.log("Cancelled")}
            />
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
