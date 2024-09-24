import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { toggleStatus, removeTask, Task, editTask } from "../../lib/tasksSlice";
import {
  Button,
  FormControl,
  Grid2,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const TasksList = () => {
  const [isCurrentlyEditingId, setIsCurrentlyEditingId] = useState<
    string | null
  >(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedFrequency, setEditedFrequency] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const handleEditingID = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditedTitle(taskToEdit.title);
      setEditedFrequency(taskToEdit.frequency);
      setIsCurrentlyEditingId(id);
    }
  };

  const handleTaskEditSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const task = tasks.find((task) => task.id === id);
    if (task) {
      dispatch(
        editTask({
          id: id,
          title: editedTitle,
          frequency: editedFrequency,
        })
      );
    }
    setIsCurrentlyEditingId(null);
  };

  const getStreak = (task: Task) => {
    const currentDate = new Date();
    let streak = 0;
    while (true) {
      const currentDateString = currentDate.toISOString().split("T")[0];
      if (task.completed.includes(currentDateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return tasks.map((task) => {
    return (
      <Paper key={task.id} sx={{ p: 3, mt: 4 }}>
        <form
          onSubmit={(e) =>
            isCurrentlyEditingId !== task.id
              ? handleEditingID(e, task.id)
              : handleTaskEditSubmit(e, task.id)
          }
        >
          <Grid2
            container
            size={12}
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Grid2
              size={{ md: 6, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: { xs: 2 },
              }}
            >
              {isCurrentlyEditingId !== task.id ? (
                <>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2">{task.frequency}</Typography>
                </>
              ) : (
                <div>
                  <TextField
                    placeholder="Edit Task"
                    fullWidth
                    onChange={(e) => setEditedTitle(e.target.value)}
                    sx={{ mb: 2 }}
                    value={editedTitle || task.title}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      value={editedFrequency || task.frequency}
                      onChange={(e) =>
                        setEditedFrequency(
                          e.target.value as "daily" | "weekly" | "monthly"
                        )
                      }
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
            </Grid2>
            <Grid2
              size={{ md: 6, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                alignItems: { md: "center", xs: "flex-start" },
                justifyContent: { md: "flex-end" },
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                color={task.completed.includes(today) ? "success" : "primary"}
                sx={{ my: 1, mr: 1 }}
                startIcon={
                  task.completed.includes(today) ? (
                    <CheckCircleOutlineOutlinedIcon />
                  ) : (
                    <CircleOutlinedIcon />
                  )
                }
                onClick={() =>
                  dispatch(toggleStatus({ id: task.id, date: today }))
                }
              >
                {task.completed.includes(today) ? "Completed" : "Mark Complete"}
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                sx={{ my: 1, mr: 1 }}
                startIcon={
                  isCurrentlyEditingId !== task.id ? (
                    <EditOutlinedIcon />
                  ) : (
                    <DoneOutlinedIcon />
                  )
                }
              >
               {isCurrentlyEditingId !== task.id ? "Edit Task" : "Done Editing"}
              </Button>
              <Button
                sx={{ my: 1 }}
                variant="outlined"
                color="error"
                onClick={() => dispatch(removeTask({ id: task.id }))}
              >
                Remove Task
              </Button>
            </Grid2>
          </Grid2>
        </form>
        <div>
          <Typography variant="body2">
            Current streak: {getStreak(task)} days
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(getStreak(task) / 30) * 100}
          />
        </div>
      </Paper>
    );
  });
};

export default TasksList;
