import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/action';

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleTask = (index) => {
    dispatch(toggleTask(index));
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <div>
      {tasks.map((task, index) => (
      <div class={`todo-item ${task.completed ? 'completed' : ''}`} key={index}>
        <input class="todo-checkbox" type="checkbox" checked={task.completed} onChange={() => handleToggleTask(index)} />
        <span>{task.text}</span>
        <button class="todo-delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
      </div>
    ))}
    </div>
  );
}

export default TaskList;
