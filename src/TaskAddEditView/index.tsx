/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { AppContext } from "../AppHandler/AppContext";
import { useContext, useState } from "react";
import { Position } from "../map/types";
import { ETaskPriority, ETaskStatus, ITask } from "../types/ITask";
import TaskOnMap from "./TaskOnMap";
import { IUser } from "../types/IUser";
import { useWindowSize } from "../useWindowSize";
import { unixTimestamp } from "../types/unixTimestamp";
import { setDate } from "date-fns";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "90%",
      marginBottom: "12px",
    },
  },
}));

const TaskAddEditView = (props: {
  task?: ITask;
  onCompleted: (task: ITask) => void;
}) => {
  const classes = useStyles();

  const { isLoading, users, activeUser, login, tasks, createTask, updateTask } =
    useContext(AppContext);

  const { task, onCompleted } = props;

  const [_id, use_id] = useState(task?._id ?? "");
  const [title, setTitle] = useState(task?._id ?? "");
  const [description, setDescription] = useState(task?._id ?? "");
  const [status, setStatus] = useState<ETaskStatus>(
    task?.status ?? ETaskStatus.Pending
  );
  const [priority, setPriority] = useState<ETaskPriority>(
    task?.priority ?? ETaskPriority.High
  );
  const [createdUser, setCreatedUser] = useState<IUser>();
  const [assignedUser, setAssignedUser] = useState<IUser>();
  const [location, setLocation] = useState<Position | null>(null);
  const [dueDate, setDueDate] = useState<string>(
    task?.dueDate
      ? moment.unix(task.dueDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );

  const windowSize = useWindowSize();

  const save = async () => {
    const task: ITask = {
      _id,
      title,
      createdUserId: createdUser?._id,
      assignedUserId: assignedUser?._id,
      description,
      status,
      location,
      priority,
      imageId: null,
      dueDate: moment(dueDate).unix(),
    };

    let returnTask: ITask;

    if (props.task?._id) {
      task._id = props.task._id;
      await updateTask(task);
      returnTask = task;
    } else {
      returnTask = await createTask(task);
    }

    onCompleted(returnTask);
  };

  return (
    <div
      className={classes.root}
      style={{
        overflowY: "scroll",
        height: "100%",
      }}
    >
      <h2>{task?._id ? "Edit" : "Add"} task</h2>
      <div
        style={{
          paddingBottom: 24,
        }}
      >
        <TaskOnMap
          width={windowSize.width || 0}
          height={200}
          onClick={setLocation}
          onDelete={() => setLocation(null)}
          point={location}
        />
      </div>
      <TextField
        label="Task Title"
        value={title}
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      ></TextField>
      <TextField
        label="Description"
        value={description}
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      ></TextField>
      <TextField
        select
        label="Status"
        value={status}
        variant="outlined"
        onChange={(e) => setStatus(e.target.value as ETaskStatus)}
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
      <TextField
        select
        label="Priority"
        value={priority}
        variant="outlined"
        onChange={(e) => setPriority(e.target.value as ETaskPriority)}
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
      <Autocomplete
        options={users}
        getOptionLabel={(user) => user.email}
        renderInput={(params) => (
          <TextField {...params} label="Assigned user" variant="outlined" />
        )}
        onChange={(event, user: IUser) => {
          user && setAssignedUser(user);
        }}
      />
      <TextField
        variant="outlined"
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
        }}
      ></TextField>
      <Button
        onClick={save}
        variant="contained"
        style={{
          marginBottom: 12,
          width: "90%",
        }}
      >
        {task?._id ? "Update" : "Add"}
      </Button>
    </div>
  );
};

export default TaskAddEditView;