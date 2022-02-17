import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Card from "./../UI/Card";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age.",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age.",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;
