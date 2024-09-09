import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase";
import { format } from "date-fns";

const TaskModal = ({ open, handleClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "High",
    dueDate: new Date(),
  });

  const handleCreateTask = async () => {
    await addDoc(collection(db, "tasks"), newTask);
    handleClose();
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
        <Button onClick={handleCreateTask} variant="contained" color="primary">
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
