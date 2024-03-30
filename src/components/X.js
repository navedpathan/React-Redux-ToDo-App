import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';


const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks'))
  };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
        return {...state, tasks: [...state.tasks, {text: action.payload, completed: false}] };

      case "DELETE_TASK":
          return {...state, tasks: state.tasks.filter((task, index) => index !== action.payload)};

      case "TOGGLE_TASK":
          return {...state, tasks: state.tasks.map((task, index) => index === action.payload ? { ...task, completed: !task.completed } : task)} 
    default:
      return state;
  }
};

// Redux store
const store = createStore(taskReducer);

export const addTask = (value) => ({ type: "ADD_TASK", payload: value });

export const deleteTask = (index) => ({ type: "DELETE_TASK", payload: index });

export const toggleTask = (index) => ({ type: "TOGGLE_TASK", payload: index });

// Component
function TaskList() {
  const [inputValue, setInputValue] = useState("");

    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
  
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  
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

    const handleDelete = (index) => {
      dispatch(deleteTask(index));
    };
  
    const handleToggle = (index) => {
      dispatch(toggleTask(index));
    };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button>Add</button>
      {tasks.map((task, index) => (
        <h3
          key={index}
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            disabled={task.completed}
            onChange={() => handleToggle(index)}
          />
          <span>{task.text}</span>

          <button onClick={() => handleDelete(index)}>Delete</button>
        </h3>
      ))}
    </form>
    
  );
}

// App component
function App() {
  return (
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}

export default App;
