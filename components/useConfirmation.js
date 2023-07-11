import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const useConfirmation = () => {
    const [visible, setVisible] = React.useState(false);
    const [data, setData] = React.useState();

    const show = (d) => {
        setData(d);
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    return {
        visible,
        show,
        hide,
        data,
    };
}

export default useConfirmation;
