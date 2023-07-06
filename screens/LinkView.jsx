import { Button, StyleSheet, Text, View } from "react-native";

const LinkView = ({ route }) => {
    const linkIndex = route.params.index;
    return (
        <View style={styles.container}>
            <Text>{route.params.index}</Text>
            {

            }
            <Button title="Add Ticket" onPress={() => console.log("pressed")}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default LinkView;
