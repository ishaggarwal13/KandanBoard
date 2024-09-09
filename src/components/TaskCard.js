import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return { textColor: "#FF5C00", bgColor: "#FFECE1" };
    case "Medium":
      return { textColor: "#FF00B8", bgColor: "#FFECE1" };
    case "Low":
      return { textColor: "#8A8A8A", bgColor: "#F0FFDD" };
    default:
      return { textColor: "black", bgColor: "transparent" };
  }
};

const getColumnColor = (status) => {
  switch (status) {
    case "TODO":
      return "#8A30E5";
    case "IN PROGRESS":
      return "#FFC04E";
    case "COMPLETED":
      return "#06C270";
    default:
      return "gray";
  }
};

const TaskCard = ({ task, index }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

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

  const priorityStyles = getPriorityStyles(task.priority);
  const columnColor = getColumnColor(task.status);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            marginBottom: "10px",
            borderRadius: "16px",
            ...provided.draggableProps.style,
          }}
        >
          <CardContent
            style={{
              padding: "16px",
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: priorityStyles.bgColor,
                }}
              >
                <Typography
                  variant="subtitle2"
                  style={{
                    color: priorityStyles.textColor,
                    margin: "0",
                  }}
                >
                  {task.priority}
                </Typography>
              </div>
              <IconButton size="small" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            </div>

            <div
              style={{
                marginBottom: "8px",
                borderLeft: `3px solid ${columnColor}`,
                paddingLeft: "8px",
                position: "relative",
              }}
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {task.title}
              </Typography>
              <Tooltip
                title={
                  showDescription ? "Hide description" : "Show description"
                }
              >
                <IconButton
                  style={{ position: "absolute", right: "0", top: "0" }}
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>

            {showDescription && (
              <Typography
                variant="body2"
                color="gray"
                style={{ marginBottom: "8px" }}
              >
                {task.description}
              </Typography>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <CalendarTodayIcon
                style={{ marginRight: "4px", fontSize: "15px", color: "gray" }}
              />
              <Typography variant="caption" color="gray">
                {format(task.dueDate.toDate(), "dd/MM/yyyy")}
              </Typography>
            </div>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  borderRadius: "12px",
                },
              }}
            >
              <MenuItem
                disabled
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Change Status
              </MenuItem>
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
