import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "firebase";
import Column from './Column';
import TaskModal from './TaskModal';
import { Button, Typograghy } from "@mui/material"

const KanbanBoard = () => {
    const [tasks, settasks] = useState([]);
    const [open, setOpen] = useState(false);

    const taskCollection = collection(db, 'tasks');

    useEffect(() => {
        const unsubscribe = onSnapshot(taskCollection, (snapshot) {
            const taskData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            settasks(taskData);
        });
    return () => unsubscribe();
    }, []);

    const handleDragEnd = (result) => {
        if(!result.destination) return;
        const {source, destination } = result;
        if(source.draggableId !== destination.draggableId) {
            const updatedTask = tasks.find(task => task.id === result.draggableId);
            updatedTask.status = destination.draggableId;
            updateDoc(doc(taskCollection, result.draggableId), updatedTask);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typograghy variant="h5" align="center" gutterBottom>
            Desktop & Mobile Application
            </Typograghy>
            <DragDropContext onDragEnd={={handleDragEnd}} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {[ 'TODO', 'IN PROGRESS', 'COMPLETED'].map((status) => (
                        <Column key={status} status={status} tasks={tasks.filter(task => task.status === status)} />
                    ))}
                </div>
            </DragDropContext>
            <Button onClick={() => setOpen(true)} variant="contained" color="primary" style={{ marginTop: '20px'}}>
                Create Task
            </Button>
            <TaskModal open={open} handleClose={() => setOpen(false)} />
        </div>
    );
};

export default KanbanBoard;
