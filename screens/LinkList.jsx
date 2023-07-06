import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLink, deleteLink } from "../state/links";
import AddButton from "../components/AddButton";
import { List } from 'react-native-paper';

const LinkList = ({ navigation }) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    links.map((l, i) => (
                        <List.Item key={l.id + i} onPress={() => navigation.navigate("LinkView", { index: i })}
                            style={{ borderBottomColor: "#f3edf6", borderBottomWidth: 0.5 }}
                            title={l.name}
                            description={l.vendorId}
                            right={props => <Pressable style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => dispatch(deleteLink(l.id))}><List.Icon  {...props} icon="delete" /></Pressable>}
                        />

                    ))
                }
            </ScrollView>
            <AddButton onPress={() => navigation.navigate("LinkAdd")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        zIndex: 10,
        width: 60,
        height: 60,
        backgroundColor: "pink",
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default LinkList;
