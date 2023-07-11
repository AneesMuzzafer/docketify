import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../components/AddButton";
import { List } from 'react-native-paper';
import { deleteTicket } from "../state/tickets";
import useConfirmation from "../components/useConfirmation";

const TicketList = ({navigation}) => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.tickets);
    const links = useSelector(state => state.links.links);

    const Confirmation = useConfirmation({
        title: "Do you want to delete this ticket?",
        content: "This action is irreversible!",
        onConfirm: (id) => { dispatch(deleteTicket(t.id)); },
        onCancel: () => console.log("Cancelled"),
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    tickets.map((t, i) => (
                        <List.Item key={t.id + i}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={links.find(l => l.id === t.link)?.name}
                            description={(new Date(t.startAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}) + "  --  " + new Date(t.endAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}))}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => Confirmation.show(t.id) }><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            {Confirmation.component}
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
