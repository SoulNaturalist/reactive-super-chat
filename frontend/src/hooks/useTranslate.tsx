import React from 'react'
import socketIOClient from "socket.io-client";

interface propsHook {
    text: String
}

export default async function useTranslate(props: propsHook) {
    const { text } = props;
    const [textTraslate, setText] = React.useState("");
    React.useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:5000");
        socket.emit("translate", { text: text });
        socket.on("translate", (data) => {
            setText(data);
        });
    }, [text])
    return textTraslate
}
