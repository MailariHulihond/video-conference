import React, { useState } from "react";
import Conference from "./conference";

function App() {
  const [name, setName] = useState("");
  let [show_conference, setConf] = useState(false);
  const nameChangeHandler = (e) => {
    setName(e.target.value);
    console.log({ name });
  };
  const join = () => {
    setConf(true);
  };

  return (
    <div className="text-center flex flex-col items-center">
      {!show_conference ? (
        <div>
          <h1 className="text-2xl font-bold pt-32">
            Welcome to conference hall
          </h1>
          <h2 className="pt-10">Please Enter your name to join conference</h2>
          <input
            className="p-2 border m-5"
            placeholder="Enter you Name"
            onChange={(e) => nameChangeHandler(e)}
          ></input>
          <button
            onClick={() => join()}
            className="bg-blue-500 px-10 py-2 rounded-lg text-white"
          >
            Join
          </button>
        </div>
      ) : null}
      {show_conference ? <Conference name={name} /> : null}
    </div>
  );
}

export default App;
