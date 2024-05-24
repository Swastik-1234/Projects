// TaskDetailsDialog.js

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function TaskDetailsDialog({ open, onClose, task }) {
    const {contributors}=task;

return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
            <Typography variant="h6" gutterBottom>Title: {task.title}</Typography>
            <Typography variant="body1" gutterBottom>Description: {task.description}</Typography>
            <Typography variant="body2" gutterBottom>Created By: {task.createdBy}</Typography>
            <Typography variant="subtitle2" gutterBottom>Contributors:</Typography>
            {contributors && contributors.map(contributor => (
                <div key={contributor._id}>
                    <Typography variant="body2" gutterBottom>Email: {contributor.user.email}</Typography>
                    <Typography variant="body2" gutterBottom>Role: {contributor.role}</Typography>
                </div>
            ))}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
);
}

export default TaskDetailsDialog;
