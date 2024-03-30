import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import X from "./components/X";

function App() {
  return (
    <div className="App">
      <h1>To-do List App</h1>
      <Provider store={store}>
        {/* <TaskInput /> */}
        <TaskList />
        {/* <X /> */}
      </Provider>
    </div>
  );
}

export default App;
