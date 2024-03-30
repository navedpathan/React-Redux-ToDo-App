import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/action";

function TaskInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(addTask(inputValue));
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button>Add</button>
    </form>
  );
}

export default TaskInput;
