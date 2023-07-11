import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const ConfirmationModal = ({ title, content, onConfirm, onCancel }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => { onConfirm(); setVisible(false) }}>Confirm</Button>
                    <Button onPress={() => { onCancel(); setVisible(false) }}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default ConfirmationModal;
