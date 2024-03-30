import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Action creators
const addTask = (text) => ({ type: 'ADD_TASK', payload: text });
const toggleTask = (index) => ({ type: 'TOGGLE_TASK', payload: index });
const deleteTask = (index) => ({ type: 'DELETE_TASK', payload: index });

// Reducer
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {...state, tasks: [...state.tasks, {text: action.payload, completed: false}] };

    case 'TOGGLE_TASK':
      return {...state, tasks: state.tasks.map((task, index) => index === action.payload ? { ...task, completed: !task.completed } : task)} 
    case 'DELETE_TASK':
      return {...state, tasks: state.tasks.filter((task, index) => index !== action.payload)};
    default:
      return state;
  }
};

// Redux store
const store = createStore(taskReducer);

// Component
function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      dispatch(addTask(inputValue));
      setInputValue('');
    }
  };

  const handleToggleTask = (index) => {
    dispatch(toggleTask(index));
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <div>
       <form onSubmit={handleAddTask}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
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
            onChange={() => handleToggleTask(index)}
          />
          <span>{task.text}</span>

          <button onClick={() => handleDeleteTask(index)}>Delete</button>
        </h3>
      ))}
      </form>
    </div>
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
