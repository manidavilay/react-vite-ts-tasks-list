import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { Button, Grid2, Paper, Typography } from "@mui/material";

const TasksList = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return (
    <section>
      {tasks.map((task) => {
        return (
            <Paper id={task.id} sx={{ p: 3, mt: 4 }}>
                <Grid2 container>
                    <Grid2 size={6} sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6">
                            {task.title}
                        </Typography>
                        <Typography variant="body2">
                            {task.frequency}
                        </Typography>
                    </Grid2>
                    <Grid2 size={6} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <Button variant="outlined" color="primary" sx={{ mx: 1 }}>Mark Completed</Button>
                        <Button variant="outlined" color="error" sx={{ mx: 1 }}>Remove Task</Button>
                    </Grid2>
                </Grid2>
            </Paper>
        );
      })}
    </section>
  );
};

export default TasksList;
