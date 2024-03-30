export const addTask = (value) => ({ type: "ADD_TASK", payload: value });

export const deleteTask = (index) => ({ type: "DELETE_TASK", payload: index });

export const toggleTask = (index) => ({ type: "TOGGLE_TASK", payload: index });

