import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Conference(props) {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(
      `http://localhost:4000/?transport=polling&name=${props.name}`
    );
    setSocket(newSocket);
    newSocket.on("connect", (data) => {});
    newSocket.on("current_users", (data) => {
      console.log("Current users: ", data);
      setUsers([...JSON.parse(data)]);
    });
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div>
      <h1 className="text-xl text-center pt-10">Conference hall</h1>
      <div className="flex flex-row">
        {users.map((u) => (
          <p key={Math.random()}>{u}</p>
        ))}
        <video width="700px" height="700px" src="https://meet.jit.si/conftest123">
          <source src="https://meet.jit.si/conftest123" type="" ></source>
        </video>
      </div>
    </div>
  );
}


export default Conference;
