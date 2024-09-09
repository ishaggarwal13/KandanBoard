import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { format } from "date-fns";

const TaskModal = ({ open, handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "High",
    dueDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateTask = async () => {
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
      setError("Failed to create task");
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
          margin: "100px auto",
          borderRadius: "4px",
          width: "300px",
          position: "relative",
        }}
      >
        <h2>Create Task</h2>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          value={format(newTask.dueDate, "yyyy-MM-dd")}
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={handleCreateTask}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Task created successfully"
        />

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
