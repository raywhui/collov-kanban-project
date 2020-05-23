import React from 'react';
import Container from '@material-ui/core/Container';
import './kanbanContainer.css';

const KanbanContainer = (props) => {
  return <div className="kanban-container">{props.children}</div>;
};
export default KanbanContainer;
