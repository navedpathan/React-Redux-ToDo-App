import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// Action creators
const addTodo = (text) => ({ type: ADD_TODO, payload: text });
const toggleTodo = (index) => ({ type: TOGGLE_TODO, payload: index });
const deleteTodo = (index) => ({ type: DELETE_TODO, payload: index });

// Reducer
const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = { text: action.payload, completed: false };
      const updatedTodos = [...state.todos, newTodo];
      // localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    case TOGGLE_TODO:
      const toggledTodos = state.todos.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      // localStorage.setItem('todos', JSON.stringify(toggledTodos));
      return { todos: toggledTodos };
    case DELETE_TODO:
      const filteredTodos = state.todos.filter((_, i) => i !== action.payload);
      // localStorage.setItem('todos', JSON.stringify(filteredTodos));
      return { todos: filteredTodos };
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
