import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import KanbanModal from '../KanbanModal';
import AddCardForm from '../AddCardForm';

import { handleOpen, handleClose } from './Swimlane.utils';

import './swimlane.css';

const Swimlane = (props) => {
  const [modalState, setModalState] = useState(false);

  return (
    <div className="swimlane">
      <div className="swimlane-header">
        <h3 className="swimlane-title" align="left">
          {props.title}
        </h3>
        {props.title === 'Applied' ? (
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
      <div className="swimlane-container">{props.children}</div>
    </div>
  );
};

export default Swimlane;
