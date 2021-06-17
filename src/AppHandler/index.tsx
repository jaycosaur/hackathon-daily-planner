import React, {useCallback, useEffect, useMemo, useState} from "react";
import {AppContext} from "./AppContext";
import {IAppContextValue} from "../types/IAppContextValue";
import {IUser} from "../types/IUser";
import {useQuery} from "react-query";
import {ITask} from "../types/ITask";
import {ITaskImage} from "../types/ITaskImage";
import {guid} from "../types/guid";
import {ITaskActivity} from "../types/ITaskActivity";

const serverBaseUrl = "https://spineless.xyz/prp-daily-planner-1";
const localStorageUserKey = "user_id";

// task images are immutable & expensive to fetch, cache in memory
const taskImagesCache = new Map<guid, ITaskImage>();

const useUsers = () => {
  return useQuery<{}, {}, IUser[]>({
    queryKey: "users",
    refetchInterval: 60 * 1000, // refetch users every 60 seconds
    queryFn: async () => {
      // please don't tell anyone how I live
      const result = await (await fetch(serverBaseUrl + "/users")).json();
      return result.items;
    }
  });
}

async function createUser(user: IUser): Promise<IUser> {
  const response = await fetch(serverBaseUrl + "/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return response.json();
}

const useTasks = () => {
  return useQuery<{}, {}, ITask[]>({
    queryKey: "tasks",
    refetchInterval: 10 * 1000, // refetch tasks every 10 seconds
    queryFn: async () => {
      // please don't tell anyone how I live
      const result = await (await fetch(serverBaseUrl + "/tasks")).json();
      return result.items;
    }
  });
}

const useTaskActivities = () => {
  return useQuery<{}, {}, Map<guid, ITaskActivity[]>>({
    queryKey: "task-activity",
    refetchInterval: 120 * 1000, // refetch task activity every 2 minutes
    queryFn: async () => {
      // please don't tell anyone how I live
      const result = await (await fetch(serverBaseUrl + "/task-activities")).json();
      const taskActivities: ITaskActivity[] = result.items;

      // dirty dirty index
      const indexedTaskActivity = new Map<guid, ITaskActivity[]>(); // map taskId to activities for this task
      for (const taskActivity of taskActivities) {
        if (!indexedTaskActivity.has(taskActivity.taskId)) {
          indexedTaskActivity.set(taskActivity.taskId, []);
        }

        indexedTaskActivity.get(taskActivity.taskId).push(taskActivity);
      }

      return indexedTaskActivity;
    }
  });
}

export const AppHandler: React.FC = ({children}) => {
  const {isLoading: isLoadingUsers, data: users, refetch: refetchUsers} = useUsers();
  const {isLoading: isLoadingTasks, data: tasks, refetch: refetchTasks} = useTasks();
  const {isLoading: isLoadingTaskActivities, data: taskActivities, refetch: refetchTasksActivities} = useTaskActivities();

  const isLoading = isLoadingUsers || isLoadingTasks || isLoadingTaskActivities;

  const [activeUser, setActiveUser] = useState<null | IUser>(null);
  const login = useCallback(async (email: string) => {
    if (isLoadingUsers) {
      throw new Error("Cannot login before users are loaded");
    }

    // look for user in users
    const existingUser = users.find(x => x.email === email);

    if (existingUser !== undefined) {
      // user already exists in system, continue with login
      localStorage.setItem(localStorageUserKey, existingUser._id);
      setActiveUser(existingUser);
      return;
    }

    // user doesn't exist in the database, create them
    const createdUser = await createUser({
      _id: undefined, // will be generated by server
      email
    });
    localStorage.setItem(localStorageUserKey, createdUser._id);

    // re-fetch the list of users in the system before we continue
    await refetchUsers();

    setActiveUser(createdUser);
  }, [isLoadingUsers, users, refetchUsers, setActiveUser]);

  const logout = useCallback(async () => {
    localStorage.setItem(localStorageUserKey, "");
    setActiveUser(null);
  }, []);

  // try and auto login if we have a user-id in local storage
  useEffect(() => {
    if (isLoading || activeUser !== null) {
      // we aren't ready, or we are already logged in
      return;
    }

    const storedUserId = localStorage.getItem(localStorageUserKey);
    if (storedUserId) {
      // re-auth with existing user key
      setActiveUser(users.find(x => x._id === storedUserId));
    }
  }, [isLoading, users, activeUser]);

  const createTask = useCallback(async (task: ITask) => {
    const response = await fetch(serverBaseUrl + "/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const createdTask = response.json();

    // re-fetch the list of tasks in the system before we return
    await refetchTasks();

    return createdTask;
  }, [refetchTasks]);

  const updateTask = useCallback(async (task: ITask) => {
    await fetch(serverBaseUrl + "/tasks/" + task._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    // re-fetch the list of tasks in the system before we return
    await refetchTasks();
  }, [refetchTasks]);

  const retrieveTaskImage = useCallback(async (imageId: string): Promise<ITaskImage> => {
    // check local cache before going out to network
    if (taskImagesCache.has(imageId)) {
      return taskImagesCache.get(imageId);
    }

    const response = await fetch(serverBaseUrl + "/task-images/" + imageId);
    const taskImage: ITaskImage = await response.json();

    // store in local cache to avoid a request next time
    taskImagesCache.set(taskImage._id, taskImage);

    return taskImage;
  }, []);

  const retrieveActivityForTask = useCallback((taskId: guid) => {
    // we pre-index in the fetch so this function can be used in render bodies without any slowdown
    return taskActivities.get(taskId) || [];
  }, []);

  const createTaskActivity = useCallback(async (taskActivity: ITaskActivity) => {
    const response = await fetch(serverBaseUrl + "/task-activities", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskActivity)
    });
    const createdTaskActivity = response.json();

    await refetchTasksActivities();

    return createdTaskActivity;
  }, []);

  const providerValue = useMemo<IAppContextValue>(() => ({
    isLoading,

    activeUser,
    users,
    login,
    logout,

    tasks,
    createTask,
    updateTask,

    retrieveActivityForTask,
    createTaskActivity,

    retrieveTaskImage
  }), [isLoading, activeUser, users, login, logout, tasks, createTask, updateTask, retrieveTaskImage]);

  return <AppContext.Provider value={providerValue}>
    {children}
  </AppContext.Provider>;
}
