import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './slcard.css';

const SLCard = (props) => {
  const { name, contact, resume } = props.applicantData;
  return (
    <Card className="sl-card">
      <CardContent>
        <Typography variant="h6" color="textPrimary" align="left">
          {name}
        </Typography>
        <Typography color="textSecondary" align="left">
          {contact}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="medium" variant="outlined">
          Resume
        </Button>
      </CardActions>
    </Card>
  );
};

export default SLCard;
