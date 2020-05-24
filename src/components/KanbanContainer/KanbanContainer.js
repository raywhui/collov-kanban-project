import React from 'react';
import Container from '@material-ui/core/Container';
import './KanbanContainer.css';

const KanbanContainer = ({ children }) => {
  return <div className="kanban-container">{children}</div>;
};
export default KanbanContainer;
