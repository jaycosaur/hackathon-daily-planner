import React from "react";
import Container from "@material-ui/core/Container";
import DumbTask from "../dumbTask";

const List = () => {
  return (
    <Container>
      <h3>Tasks</h3>
      <DumbTask />
    </Container>
  );
};

export default List;
