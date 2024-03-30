const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {...state, tasks: [...state.tasks, {text: action.payload, completed: false}] };

    case 'TOGGLE_TASK':
      return {...state, tasks: state.tasks.map((task, index) => index === action.payload ? { ...task, completed: !task.completed } : task)} ;

    case 'DELETE_TASK':
      return {...state, tasks: state.tasks.filter((task, index) => index !== action.payload)};

    default:
      return state;
  }
};