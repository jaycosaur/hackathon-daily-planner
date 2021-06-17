import { useContext } from "react";
import { AppContext } from "../AppHandler/AppContext";
import { ETaskStatus, ITask } from "../types/ITask";
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

  const filteredTasks = filters.openTask
    ? searchedTasks.filter((task) => task.status !== ETaskStatus.Done)
    : searchedTasks;

  return {
    tasks: filteredTasks,
  };
};
