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

  const filteredTasks = filters.searchTerm
    ? textSearchTasks(filters.searchTerm, tasks)
    : tasks;

  return {
    tasks: filteredTasks,
  };
};
