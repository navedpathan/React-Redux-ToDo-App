export const addTask = (text) => ({ type: 'ADD_TASK', payload: text });

export const toggleTask = (index) => ({ type: 'TOGGLE_TASK', payload: index });

export const deleteTask = (index) => ({ type: 'DELETE_TASK', payload: index });


