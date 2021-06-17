import {
    Box,
    Button,
    Grid,
    makeStyles,
    MenuItem,
    TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { AppContext } from "../AppHandler/AppContext";
import React, { useContext, useState } from "react";
import { Position } from "../map/types";
import { ETaskPriority, ETaskStatus, ITask } from "../types/ITask";
import TaskOnMap from "./TaskOnMap";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));

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
    const classes = useStyles();

    const { isLoading, users, activeUser, login, tasks, createTask } =
        useContext(AppContext);

    const { task } = props;

    const [_id, use_id] = useState(task?._id ?? "");
    const [title, setTitle] = useState(task?._id ?? "");
    const [description, setDescription] = useState(task?._id ?? "");
    const [status, setStatus] = useState<ETaskStatus>(
        task?.status ?? ETaskStatus.Pending
    );
    const [priority, setPriority] = useState<ETaskPriority>(
        task?.priority ?? ETaskPriority.High
    );
    const [createdUserId, setCreatedUserId] = useState("");
    const [assignedUserId, setAssignedUserId] = useState("");
    const [location, setLocation] = useState<Position | null>(null);

    const save = () => {
        const task: ITask = {
            _id,
            title,
            createdUserId,
            assignedUserId,
            description,
            status,
            location,
            priority,
            imageId: null,
            dueDate: null,
        };

        createTask(task);
    };

    return (
        <form className={classes.root}>
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                        label="Status"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as ETaskStatus)
                        }
                    >
                        {Object.entries(ETaskStatus).map((entry) => {
                            const [key, value] = entry;
                            return (
                                <MenuItem key={key} value={value}>
                                    {value}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                        label="Priority"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as ETaskPriority)
                        }
                    >
                        {Object.entries(ETaskPriority).map((entry) => {
                            const [key, value] = entry;
                            return (
                                <MenuItem key={key} value={value}>
                                    {value}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete
                        options={users}
                        getOptionLabel={(user) => user.email}
                        renderInput={(params) => (
                            <TextField {...params} label="Assigned user" />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Task Title"></TextField>
                </Grid>
                <TaskOnMap
                    width={400}
                    height={400}
                    task={{ ...props.task, location }}
                    onClick={setLocation}
                    onDelete={() => setLocation(null)}
                />

                <Grid item xs={12}>
                    <Button onClick={save}>Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskView;
