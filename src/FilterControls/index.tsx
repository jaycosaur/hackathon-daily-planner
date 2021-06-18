/* eslint-disable @typescript-eslint/no-unused-vars */
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./style.css";

import Chip from "@material-ui/core/Chip";
import { useFilters } from "./FilterContext";
import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { AppContext } from "../AppHandler/AppContext";
import { ETaskStatus, taskStatusAsString } from "../types/ITask";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";

const StatusPicker: React.FC<{
  open: boolean;
  handleClose: () => void;
  onSelect: (status: ETaskStatus | null) => void;
  selected: ETaskStatus | null;
}> = ({ open, handleClose, onSelect, selected }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title">Filter by Status</DialogTitle>
      <List>
        {selected && (
          <ListItem autoFocus button onClick={() => onSelect(null)}>
            <ListItemAvatar>
              <Avatar>
                <ClearIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Clear Filter" />
          </ListItem>
        )}
        {Object.entries(ETaskStatus).map(([key, value]) => (
          <ListItem
            button
            onClick={() => onSelect(value as ETaskStatus)}
            key={key}
            selected={value === selected}
          >
            <ListItemText primary={taskStatusAsString(value)} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const CrewPicker: React.FC<{
  open: boolean;
  handleClose: () => void;
  onSelect: (userId: string | null) => void;
  selected: string | null;
}> = ({ open, handleClose, onSelect, selected }) => {
  const { users } = React.useContext(AppContext);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Filter by Crew</DialogTitle>
      <List>
        {selected && (
          <ListItem autoFocus button onClick={() => onSelect(null)}>
            <ListItemAvatar>
              <Avatar>
                <ClearIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Clear Filter" />
          </ListItem>
        )}
        {users.map((user) => (
          <ListItem
            button
            onClick={() => onSelect(user._id)}
            key={user._id}
            selected={user._id === selected}
          >
            <ListItemText primary={user.email} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const DateRangePicker: React.FC<{
  open: boolean;
  handleClose: () => void;
  onSelect: (dateRange: [number, number] | null) => void;
  selected: [number, number] | null;
}> = ({ open, handleClose, onSelect, selected }) => {
  const { users } = React.useContext(AppContext);

  const [startDate, setStartDate] = React.useState<string>(
    selected
      ? moment.unix(selected[0]).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState<string>(
    selected
      ? moment.unix(selected[1]).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );

  const handleSubmit = () => {
    onSelect([moment(startDate).unix(), moment(endDate).unix()]);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title">Filter by Crew</DialogTitle>
      <ListItem
        autoFocus
        button
        onClick={() => onSelect(null)}
        style={{ marginBottom: "15px" }}
      >
        <ListItemAvatar>
          <Avatar>
            <ClearIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Clear Filter" />
      </ListItem>

      <TextField
        variant="outlined"
        type="date"
        value={startDate}
        label="Start Date"
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
        style={{ marginBottom: "15px" }}
      />
      <TextField
        variant="outlined"
        type="date"
        label="End Date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
        style={{ marginBottom: "15px" }}
      />
      <Button onClick={handleSubmit}>Add Filter</Button>
    </Dialog>
  );
};

const FilterControls = () => {
  const { filters, setFilters } = useFilters();

  const [showStatusFilter, setShowStatusFilter] = React.useState(false);
  const [showUserFilter, setShowUserFilter] = React.useState(false);
  const [showDateFilter, setShowDateFilter] = React.useState(false);

  return (
    <div
      className="my-class"
      style={{
        padding: "12px 12px 6px",
        background: "rgba(255,255,255,0.7)",
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))",
      }}
    >
      <TextField
        value={filters.searchTerm}
        onChange={(ev) =>
          setFilters({
            ...filters,
            searchTerm: ev.target.value,
          })
        }
        style={{ width: "100%" }}
        id="outlined-search"
        label="Search"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          marginTop: 6,
          flex: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Chip
          avatar={<FilterListIcon />}
          label="Crew"
          onClick={() => {
            setShowUserFilter(true);
          }}
          color={filters.userId ? "secondary" : undefined}
        />
        <Chip
          avatar={<FilterListIcon />}
          label="Status"
          onClick={() => {
            setShowStatusFilter(true);
          }}
          color={filters.status ? "secondary" : undefined}
        />
        <Chip
          avatar={<FilterListIcon />}
          label="Dates"
          onClick={() => {
            setShowDateFilter(true);
          }}
          color={filters.dateRange ? "secondary" : undefined}
        />
      </div>
      <CrewPicker
        open={showUserFilter}
        onSelect={(userId) => {
          setShowUserFilter(false);
          setFilters({
            ...filters,
            userId,
          });
        }}
        handleClose={() => setShowUserFilter(false)}
        selected={filters.userId}
      />
      <StatusPicker
        open={showStatusFilter}
        onSelect={(status) => {
          setShowStatusFilter(false);
          setFilters({
            ...filters,
            status,
          });
        }}
        handleClose={() => setShowStatusFilter(false)}
        selected={filters.status}
      />
      <DateRangePicker
        open={showDateFilter}
        onSelect={(dateRange) => {
          setShowDateFilter(false);
          setFilters({
            ...filters,
            dateRange: dateRange,
          });
        }}
        handleClose={() => setShowDateFilter(false)}
        selected={filters.dateRange}
      />
    </div>
  );
};

export default FilterControls;
