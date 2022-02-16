import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import takeName from "./api/takeName";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";

function App() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [helperText, setHelperText] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("hangman");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (input) {
      setNameError(false);
      setHelperText(false);
      takeName(input).then(setUser).catch(console.error);
    } else {
      setNameError(true);
      setHelperText(true);
    }
  };

  const onInputChange = (event) => {
    if (event.target.value) {
      setNameError(false);
      setHelperText(false);
    }
    setInput(event.target.value);
  };

  return (
    <div className="App">
      <Word secretWordLength={5} correctLetters={[
      {
        letter: "A",
        position: [0],
      },
    ]} />
     <Keyboard guess={() => {}} />
      {user ? (
        <div>
          <h1>Hi, {user.name}</h1>

        </div>
      ) : (
        <>
          <h1>Welcome to The Hangman Game!</h1>

          <form aria-label="player name" onSubmit={onSubmitForm}>
            <label htmlFor="name">Enter your name </label>
            <TextField
              type="text"
              id="name"
              onChange={onInputChange}
              error={nameError}
              helperText={helperText ? "Your name is required" : ""}
            />

            <Button variant="contained" type="submit" color="primary">
              Start the game
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
