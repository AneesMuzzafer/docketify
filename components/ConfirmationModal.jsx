import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const ConfirmationModal = ({ confirmation, title, content, onConfirm, onCancel }) => {
    const { visible, data, hide, } = confirmation;
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hide}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => { onConfirm(data); hide() }}>Confirm</Button>
                    <Button onPress={() => { onCancel(); hide() }}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default ConfirmationModal;
