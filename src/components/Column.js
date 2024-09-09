import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Typography } from "@mui/material";

const Column = ({ status, tasks }) => {
  return (
    <Droppable>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            minWidth: "300px",
            margin: "0 10px",
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6" style={{ color: statusColor(status) }}>
            {status}
          </Typography>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const statusColor = (status) => {
  switch (status) {
    case "TODO":
      return "#7c4dff";
    case "IN PROGRESS":
      return "#ffb74d";
    case "COMPLETED":
      return "#4caf50";
    default:
      return "#000";
  }
};

export default Column;
