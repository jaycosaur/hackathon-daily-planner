import { Box, Button, Grid, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { ETaskPriority, ETaskStatus, ITask } from "../types/ITask";

const TaskView = (props: { task?: ITask }) => {
    // const [task, setTask] = useState<ITask>({
    //     _id: "someId",
    //     title: "hello",
    //     createdUserId: "1",
    //     assignedUserId: "2",
    //     description: "desc",
    //     status: ETaskStatus.Pending,
    //     priority: ETaskPriority.Medium,
    //     location: null,
    //     imageId: null,
    //     dueDate: null,
    // });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    return (
        <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12}>
                <h2>Add/Edit task</h2>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Description"
                    select
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    select
                    label="Status"
                    value={status}
                    onChange={(e) => setDescription(e.target.value)}
                >
                    <MenuItem>Pending</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Priority"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField label="Task Title"></TextField>
            </Grid>
            <Grid item xs={12}>
                <Button>Save</Button>
            </Grid>
        </Grid>
    );
};

export default TaskView;
