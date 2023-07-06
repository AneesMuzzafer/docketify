import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLink } from "../state/links";
import AddButton from "../components/AddButton";

const LinkList = ({ navigation }) => {
    const dispatch = useDispatch();
    const links = useSelector(state => state.links.links);

    return (
        <View style={styles.container}>
            {
                links.map((l, i) => (
                    <Pressable key={i} onPress={() => navigation.navigate("LinkView", { index: i })}>
                        <Text>{l}</Text>
                    </Pressable>
                ))
            }
            <AddButton onPress={() => dispatch(addLink("afsdf"))} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
