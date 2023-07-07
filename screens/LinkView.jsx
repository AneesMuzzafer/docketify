import { Button, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FAB, List, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteLink } from "../state/links";

const LinkView = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const linkId = route.params.id;

    const links = useSelector(state => state.links.links)
    const link = links.find(l => l.id === linkId);
    const tickets = useSelector(state => state.tickets.tickets).filter(t => t.link === linkId);

    return (
        <View style={styles.container}>
            <Text variant="headlineSmall" style={{ color: "indigo"}}>{link.name}</Text>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Text variant="bodyLarge">Vendor: {link.vendorId}</Text>
                <Text variant="bodyLarge">CP: {link.cp}</Text>
            </View>
            <Text variant="titleMedium" style={{marginTop: 30}}>Tickets</Text>
            <ScrollView>
                {
                    tickets.map((t, i) => (
                        <List.Item key={t.id + i}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={links.find(l => l.id === t.link).name}
                            description={(new Date(t.startAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + "  --  " + new Date(t.endAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }))}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => dispatch(deleteLink(l.id))}><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            <FAB
                icon="plus"
                label="Add Ticket"
                uppercase
                variant="tertiary"
                style={styles.addTicket}
                onPress={() => navigation.navigate("Tickets", { screen: "TicketAddEdit", params: { linkId: linkId } })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    addTicket: {
        position: "absolute",
        bottom: 30,
        right: 30
    }
});

export default LinkView;
