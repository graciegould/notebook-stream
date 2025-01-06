import { io, Socket } from 'socket.io-client';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

const SocketHandler = forwardRef((props, socketRef) => {
    useEffect(() => {
        socketRef.current = io('http://localhost:3000');
        const socket = socketRef.current;
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });
        return () => {
            socket.disconnect();
        };
    }, []);    
    return <></>;
});

export default SocketHandler;