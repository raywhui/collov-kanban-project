import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './SLCard.css';

const SLCard = ({
  applicantData,
  cardIndex,
  setNewCardIndex,
  setCurrentCardIndex,
}) => {
  const [onDrag, setOnDrag] = useState(false);
  const { name, email, resume, _id, status } = applicantData;

  return (
    <Card
      className={`sl-card ${onDrag ? 'on-drag' : ''}`}
      data-applicant-id={_id}
      draggable
      onDragStart={(e) => {
        setOnDrag(true);
        e.dataTransfer.setData('id', _id);
        e.dataTransfer.setData('status', status);
        setCurrentCardIndex(cardIndex);
      }}
      onDragEnd={(e) => {
        setCurrentCardIndex(cardIndex);
        setOnDrag(false);
        e.preventDefault();
      }}
      onDragOver={(e) => {
        setNewCardIndex(cardIndex);
        e.preventDefault();
      }}
      onDrop={(e) => {
        // Dragged over index
        setNewCardIndex(cardIndex);
      }}
    >
      <CardContent>
        <Typography variant="h6" color="textPrimary" align="left">
          {name}
        </Typography>
        <Typography color="textSecondary" align="left">
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          size="medium"
          variant="outlined"
          onClick={() => {
            fetch('/test').then((res) => console.log(res));
          }}
        >
          Resume
        </Button>
      </CardActions>
    </Card>
  );
};

export default SLCard;
