import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLink, deleteLink } from "../state/links";
import AddButton from "../components/AddButton";
import { Dialog, List, Portal, Button } from 'react-native-paper';
import React from "react";
import useConfirmation from "../components/useConfirmation";

const LinkList = ({ navigation }) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    const Confirmation = useConfirmation({
        title: "Do you want to delete this link?",
        content: "This action is irreversible!",
        onConfirm: (id) => { dispatch(deleteLink(id)); dispatch(deleteTickets(id)); },
        onCancel: () => console.log("Cancelled"),
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    links.map((l, i) => (
                        <List.Item key={l.id + i} onPress={() => navigation.navigate("LinkView", { id: l.id })}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={l.name}
                            description={l.vendorId}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => Confirmation.show(l.id)}><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            <AddButton onPress={() => navigation.navigate("LinkAdd")} />
            {Confirmation.component}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
});

export default LinkList;
