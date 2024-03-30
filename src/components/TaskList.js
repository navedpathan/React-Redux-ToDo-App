import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTask } from '../redux/action';

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

export default TaskList;
