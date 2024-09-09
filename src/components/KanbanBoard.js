import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { Button, Typography, Snackbar } from "@mui/material";

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

      // Optimistic UI update
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

        // Revert UI on failure
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Desktop & Mobile Application
      </Typography>
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
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Create Task
      </Button>
      <TaskModal open={open} handleClose={() => setOpen(false)} />

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
