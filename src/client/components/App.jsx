import React, { Suspense, useState, useEffect } from "react";
import Board from "./board";
import {
  SharedStateProvider,
  useSharedStateCreator
} from "@retrium/react-sharedb";

function useWebsocket(host) {
  var [ws, setWS] = useState(null);
  useEffect(() => {
    var innerWS = new WebSocket(host);
    setWS(innerWS);

    return () => {
      innerWS.close();
    };
  }, [host]);

  return ws;
}

function CheapButton() {
  const creator = useSharedStateCreator();

  var onClick = () => {
    creator("collection", "doc", []);
  };

  return <button onClick={onClick}>Start 'er up</button>;
}

export default function App() {
  var ws = useWebsocket("wss://" + window.location.host);
  return (
    <SharedStateProvider websocket={ws}>
      <Suspense fallback={<CheapButton />}>
        <Board />
      </Suspense>
    </SharedStateProvider>
  );
}
