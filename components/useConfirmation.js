import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const useConfirmation = ({ title, content, onConfirm, onCancel }) => {
    const [visible, setVisible] = React.useState(false);
    const [data, setData] = React.useState();

    const show = (d) => {
        console.log(d);
        setData(d);
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    const component = (
        <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => { onConfirm(data); setVisible(false) }}>Confirm</Button>
                    <Button onPress={() => { onCancel(); setVisible(false) }}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

    return {
        show,
        hide,
        component
    };
}

export default useConfirmation;
