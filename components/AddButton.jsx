import { Pressable, StyleSheet, Text } from "react-native";

const AddButton = ({ onPress }) => {
    return (
        <Pressable style={styles.addButton} onPress={onPress}>
            <Text style={{ fontSize: 26 }}>+</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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

export default AddButton;
