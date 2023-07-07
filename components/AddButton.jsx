import { Pressable, StyleSheet, Text } from "react-native";
import { FAB } from "react-native-paper";

const AddButton = ({ onPress, label = "Add Link" }) => {
    return (
        <FAB
            icon="plus"
            style={styles.addButton}
            onPress={onPress}
            uppercase
            label={label}
        />
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
    }
});

export default AddButton;
