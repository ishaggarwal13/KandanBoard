import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { Button, Typography, Snackbar, Paper, Box } from "@mui/material";

const KanbanBoard = () => {
  const [tasks, settasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const taskCollection = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onSnapshot(taskCollection, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      settasks(taskData);
    });
    return () => unsubscribe();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTask = tasks.find((task) => task.id === result.draggableId);
      const originalStatus = updatedTask.status;
      updatedTask.status = destination.droppableId;

      settasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id
            ? { ...task, status: destination.droppableId }
            : task
        )
      );

      try {
        await updateDoc(doc(db, "tasks", result.draggableId), updatedTask);
      } catch (error) {
        setError("Failed to update task status");
        console.error("Error updating document: ", error);

        settasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id
              ? { ...task, status: originalStatus }
              : task
          )
        );
      }
    }
  };

  return (
    <div style={{ padding: "110px" }}>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" style={{ margin: 0 }}>
          Desktop & Mobile Application
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          style={{
            marginLeft: "auto",
            backgroundColor: "#8A31E5",
            color: "white",
          }}
        >
          Create Task
        </Button>
      </Paper>
      <TaskModal open={open} handleClose={() => setOpen(false)} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["TODO", "IN PROGRESS", "COMPLETED"].map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DragDropContext>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </div>
  );
};

export default KanbanBoard;
