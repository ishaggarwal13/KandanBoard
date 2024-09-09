import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { format } from "date-fns";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";

const TaskCard = ({ task, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    updateDoc(doc(db, "tasks", task.id), { ...task, status });
    setAnchorEl(null);
  };

  const handleDeleteTask = () => {
    deleteDoc(doc(db, "tasks", task.id));
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ marginBottom: "10px", ...provided.draggableProps.style }}
        >
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{task.title}</Typography>
              <IconButton size="small" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            </div>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {format(task.dueDate.toDate(), "dd/MM/yyyy")}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleStatusChange("TODO")}>
                Todo
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("IN PROGRESS")}>
                In Progress
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("COMPLETED")}>
                Completed
              </MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </Menu>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
