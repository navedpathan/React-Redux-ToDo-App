import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Action creators
const addTodo = (text) => ({ type: 'ADD_TODO', payload: text });
const toggleTodo = (index) => ({ type: 'TOGGLE_TODO', payload: index });
const deleteTodo = (index) => ({ type: 'DELETE_TODO', payload: index });

// Reducer
const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, {text: action.payload, completed: false}] };

    case 'TOGGLE_TODO':
      return {...state, todos: state.todos.map((todo, index) => index === action.payload ? { ...todo, completed: !todo.completed } : todo)} 
    case 'DELETE_TODO':
      return {...state, todos: state.todos.filter((todo, index) => index !== action.payload)};
    default:
      return state;
  }
};

// Redux store
const store = createStore(todoReducer);

// Component
function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleToggleTodo = (index) => {
    dispatch(toggleTodo(index));
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => handleToggleTodo(index)}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// App component
function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
