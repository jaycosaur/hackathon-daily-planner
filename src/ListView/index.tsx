import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import { AppContext } from "../AppHandler/AppContext";
import Task from "../TaskCard";

const ListView = () => {
  const { tasks } = useContext(AppContext);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <h3>Tasks</h3>
      {tasks && tasks.map((t) => <Task key={t._id} task={t} />)}
    </Container>
  );
};

export default ListView;
