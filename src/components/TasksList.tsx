import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { toggleStatus, removeTask } from "../../lib/tasksSlice";
import { Button, Grid2, Paper, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const TasksList = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0]

  return (
    <section>
      {tasks.map((task) => {
        return (
          <Paper key={task.id} sx={{ p: 3, mt: 4 }}>
            <Grid2 container>
              <Grid2 size={6} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.frequency}</Typography>
              </Grid2>
              <Grid2
                size={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  color={task.completed.includes(today) ? "success" : "primary"}
                  sx={{ mx: 1 }}
                  startIcon={
                    task.completed.includes(today) ? (
                      <CheckCircleOutlineOutlinedIcon />
                    ) : (
                      <CircleOutlinedIcon />
                    )
                  }
                  onClick={() => dispatch(toggleStatus({ id: task.id, date: today }))}
                >
                  {task.completed.includes(today) ? "Completed" : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mx: 1 }}
                  onClick={() => dispatch(removeTask({ id: task.id }))}
                >
                  Remove Task
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
        );
      })}
    </section>
  );
};

export default TasksList;
