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
    </div>
  );
}

export default TaskList;
