import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div  class="App">
      <h1>To-do List App</h1>
      <Provider store={store}>
        <TaskInput />
        <TaskList />
      </Provider>
    </div>
  );
}

export default App;
