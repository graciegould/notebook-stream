'use client';
import { useEffect, useRef } from "react";
import SocketHandler from './socket/socket-handler'
export default function Home() {
  const socketRef = useRef<Record<string, unknown>>({});

  return (
    <div>
      <SocketHandler ref={socketRef}/>
    </div>
  );
}
