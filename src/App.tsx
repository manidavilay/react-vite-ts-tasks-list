import { Provider } from "react-redux";
import store from "../lib/store"
import { Container, Typography } from "@mui/material";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import "./App.css";

function App() {
  return (
    <Provider store={store}>   
      <Typography variant="h1" display="flex" justifyContent="center" sx={{ mb: 4 }}>Tasks List</Typography> 
      <Container maxWidth="md">
        <AddTask />
        <TasksList />
      </Container>
    </Provider>
  );
}

export default App;
