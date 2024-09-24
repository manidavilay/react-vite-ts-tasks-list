import { Provider } from "react-redux";
import store from "../lib/store";
import { Container, Typography } from "@mui/material";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Typography
        variant="h2"
        component="h1"
        display="flex"
        justifyContent="center"
        sx={{ my: 4, fontSize: { md: "3.75rem", sm: "2rem", xs: "2rem" } }}
      >
        Tasks List
      </Typography>
      <Container maxWidth="md">
        <AddTask />
        <TasksList />
      </Container>
    </Provider>
  );
}

export default App;
