import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { addLink } from "../state/links";
import { TextInput, Text, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { vendorList } from "../utils/Utils";

const LinkAdd = ({navigation}) => {
    const dispatch = useDispatch();
    const [link, setLink] = React.useState({
        id: new Date().toISOString(),
        name: "",
        cp: "",
        vendorId: ""
    });

    const [showDropDown, setShowDropDown] = React.useState(false);

    const handleSave = () => {
        dispatch(addLink(link));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flex: 1, flexDirection: "column", gap: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>Name</Text>
                    <View style={{ flex: 1 }}>
                        <TextInput mode="outlined" value={link.name} onChange={(e) => setLink({ ...link, name: e.nativeEvent.text })} />
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>CP Number</Text>
                    <View style={{ flex: 1 }}>
                        <TextInput mode="outlined" value={link.cp} onChange={(e) => setLink({ ...link, cp: e.nativeEvent.text })} />
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }}>
                    <Text style={{ width: 100 }}>Vendor</Text>
                    <View style={{ flex: 1 }}>
                        <DropDown
                            label={"Select Vendor"}
                            mode={"outlined"}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={link.vendorId}
                            setValue={(e) => setLink((p) => ({ ...p, vendorId: e }))}
                            list={vendorList}
                        />
                    </View>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <Button style={{ width: "70%" }} mode="contained" onPress={handleSave}>
                    Save
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default LinkAdd;
