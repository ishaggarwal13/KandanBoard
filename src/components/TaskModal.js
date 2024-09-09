import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const TaskModal = ({ open, handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "High",
    dueDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newError = { title: "", dueDate: "" };

    if (!newTask.title) {
      newError.title = "Title is required";
      isValid = false;
    }
    if (!newTask.dueDate) {
      newError.dueDate = "Due date is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleCreateTask = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), newTask);
      setSuccess(true);
      setNewTask({
        title: "",
        description: "",
        status: "TODO",
        priority: "High",
        dueDate: new Date(),
      });
      handleClose();
    } catch (error) {
      setError({ ...error, general: "Failed to create task" });
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          width: "50%",
          height: "90%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <IconButton style={{ marginRight: "10px" }}>
            <AddIcon />
          </IconButton>
          <Typography variant="h6">Create Task</Typography>
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", top: "5px", right: "5px" }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Typography variant="subtitle1">Title</Typography>
        <TextField
          fullWidth
          margin="dense"
          required
          error={!!error.title}
          helperText={error.title}
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <Typography variant="subtitle1">Description</Typography>
        <TextField
          fullWidth
          margin="dense"
          required
          multiline
          rows={3}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />

        <Typography variant="subtitle1">Select Date</Typography>
        <TextField
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          error={!!error.dueDate}
          helperText={error.dueDate}
          value={format(newTask.dueDate, "yyyy-MM-dd")}
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
        />

        <Typography variant="subtitle1">Status</Typography>
        <FormControl fullWidth margin="dense">
          <Select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle1">Priority</Typography>
        <FormControl fullWidth margin="dense">
          <Select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
              borderColor: "#8A31E5",
              color: "#8A31E5",
              backgroundColor: "white",
              marginRight: "10px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTask}
            variant="contained"
            style={{
              backgroundColor: "#8A31E5",
              color: "white",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Task"}
          </Button>
        </div>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Task created successfully"
        />

        <Snackbar
          open={!!error.general}
          autoHideDuration={6000}
          onClose={() => setError({ ...error, general: "" })}
          message={error.general}
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
