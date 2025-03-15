import React, { useState } from "react";
import Lottie from "lottie-react";
import rocketAnimation from "./assets/rocket.json";
import searchAnimation from "./assets/search.json";
import refreshAnimation from "./assets/refresh.json";
import trashAnimation from "./assets/trash.json";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [loadingAnimation, setLoadingAnimation] = useState(null); // Stores the current animation

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleButtonClick = async (action) => {
    let animationData;
    let res;

    switch (action) {
      case "submit":
        animationData = rocketAnimation;
        res = await fetch(`${apiUrl}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email }),
        });
        break;
      case "fetch":
        animationData = searchAnimation;
        res = await fetch(`${apiUrl}/user?email=${email}`);
        break;
      case "update":
        animationData = refreshAnimation;
        res = await fetch(`${apiUrl}/user`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email }),
        });
        break;
      case "delete":
        animationData = trashAnimation;
        res = await fetch(`${apiUrl}/user?email=${email}`, {
          method: "DELETE",
        });
        break;
      default:
        return;
    }

    // Show the animation in the response box
    setLoadingAnimation(animationData);
    setResponse(null); // Hide previous response while loading

  try {
    setTimeout(async () => {
      try {
        const data = await res.text();
        setResponse(data);
      } catch (error) {
        setResponse("Error: Unable to process request.");
      }
      setLoadingAnimation(null); // Hide animation after response is received
    }, 2000);
  } catch (error) {
    setResponse("Error: Network issue or server is unreachable.");
    setLoadingAnimation(null);
  }
};

  return (
    <div className="container">
      <h1>Serverless Golang App</h1>
      <p>Interact with the AWS Lambda backend</p>
      <div className="content">
        <div className="form-container">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          <div className="button-grid">
            <button onClick={() => handleButtonClick("submit")} className="btn">Submit</button>
            <button onClick={() => handleButtonClick("fetch")} className="btn">Fetch</button>
            <button onClick={() => handleButtonClick("update")} className="btn">Update</button>
            <button onClick={() => handleButtonClick("delete")} className="btn">Delete</button>
          </div>
        </div>

        <div className="response-container">
          <h2>Response</h2>
          {loadingAnimation ? (
            <Lottie animationData={loadingAnimation} className="lottie-animation" />
          ) : (
            response && <pre className="response-box">{response}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;