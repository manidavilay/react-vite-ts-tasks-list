import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { addTask } from "../../lib/tasksSlice";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";

const AddTask = () => {
  const [title, setTitle] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title !== "") {
        dispatch(addTask({
            title: title,
            frequency: frequency
        }))
    }
    setTitle("")
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField placeholder="Add New Task" fullWidth onChange={e => setTitle(e.target.value)} sx={{ mb: 2 }} value={title} />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select value={frequency} onChange={e => setFrequency(e.target.value as "daily" | "weekly" | "monthly")}>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="outlined" color="primary">Add New Task</Button>
    </form>
  );
};

export default AddTask;
