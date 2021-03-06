import { useContext } from "react";
import { AppContext } from "../AppHandler/AppContext";
import { ITask } from "../types/ITask";
import { useFilters } from "./FilterContext";

const textSearchTasks = (searchTerm: string, tasks: ITask[]): ITask[] => {
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const useFilteredTasks = () => {
  const { filters } = useFilters();
  const { tasks } = useContext(AppContext);

  const searchedTasks = filters.searchTerm
    ? textSearchTasks(filters.searchTerm, tasks)
    : tasks;

  const filteredStatusTasks = filters.status
    ? searchedTasks.filter((task) => task.status === filters.status)
    : searchedTasks;

  const filteredUserTasks = filters.userId
    ? filteredStatusTasks.filter(
        (task) => task.assignedUserId === filters.userId
      )
    : filteredStatusTasks;

  const filteredDateTasks = filters.dateRange
    ? filteredUserTasks.filter(
        (task) =>
          task.startDate >= filters.dateRange[0] &&
          task.dueDate <= filters.dateRange[1]
      )
    : filteredUserTasks;

  return {
    tasks: filteredDateTasks,
  };
};
