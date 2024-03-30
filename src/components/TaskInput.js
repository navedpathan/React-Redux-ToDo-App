import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/action';

function TaskInput() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      dispatch(addTask(inputValue));
      setInputValue('');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleAddTask}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button>Add</button>
      </form>
    </div>
  )
}

export default TaskInput