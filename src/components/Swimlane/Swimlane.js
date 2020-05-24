import React, { useState, useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import KanbanModal from '../KanbanModal';
import AddCardForm from '../AddCardForm';
import Context from '../../context';

import { changeSwimlanes, changeCardOrder } from './Swimlane.utils';
import './Swimlane.css';

const Swimlane = ({
  title,
  children,
  setSwimlaneStates,
  swimlaneStates,
  currentCardIndex,
  newCardIndex,
}) => {
  const [modalState, setModalState] = useState(false);
  const { store: applicants, updateStore } = useContext(Context);

  return (
    <div
      className="swimlane"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const applicantId = e.dataTransfer.getData('id');
        const oldStatus = e.dataTransfer.getData('status');
        const newStatus = title;
        if (oldStatus !== newStatus) {
          changeSwimlanes(
            applicantId,
            oldStatus,
            newStatus,
            setSwimlaneStates,
            swimlaneStates
          );
        } else if (oldStatus === newStatus) {
          changeCardOrder(
            currentCardIndex,
            newCardIndex,
            setSwimlaneStates,
            swimlaneStates,
            oldStatus
          );
        }
      }}
    >
      <div className="swimlane-header">
        <h3 className="swimlane-title" align="left">
          {title}
        </h3>
        {title === 'Applied' ? (
          <div>
            <IconButton
              size="small"
              className="add-card"
              onClick={() => {
                setModalState(true);
              }}
            >
              <AddIcon />
            </IconButton>
            <KanbanModal modalState={modalState} setModalState={setModalState}>
              <AddCardForm />
            </KanbanModal>
          </div>
        ) : (
          ''
        )}
      </div>
      <Divider className="swimlane-divider" />
      <div className="swimlane-container">{children}</div>
    </div>
  );
};

export default Swimlane;
