import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { addComment, addCommentToState, downloadResume } from './SLCard.utils';

import './SLCard.css';

const SLCard = ({
  applicantData,
  cardIndex,
  setSwimlaneStates,
  swimlaneStates,
  setNewCardIndex,
  setCurrentCardIndex,
}) => {
  const [onDrag, setOnDrag] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [commentState, setCommentState] = useState('');
  const { name, email, resume, _id, status, comments } = applicantData;
  return (
    <Card
      className={`sl-card ${onDrag ? 'on-drag' : ''}`}
      data-applicant-id={_id}
      draggable
      onDragStart={(e) => {
        setOnDrag(true);
        e.dataTransfer.setData('id', _id);
        e.dataTransfer.setData('status', status.title);
        setCurrentCardIndex(cardIndex);
        setExpanded(false);
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
        {/* <a
          // href="http://localhost:3001/files/a57ce275bd6480f61bc70d011b48be33.pdf"
          href="/files/a57ce275bd6480f61bc70d011b48be33.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-button-wrapper"
        > */}
        <Button
          color="primary"
          size="medium"
          variant="outlined"
          onClick={() => {
            downloadResume(resume);
          }}
        >
          Resume
        </Button>
        {/* </a> */}

        <Button
          className="more-info"
          color="primary"
          size="medium"
          onClick={() => {
            expanded ? setExpanded(false) : setExpanded(true);
          }}
        >
          <ExpandMoreIcon className={expanded ? 'expanded-icon' : ''} /> More
          Info
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="collapse-content">
          {/* <Typography align="left" variant="h6">
            Average Rating:
          </Typography> */}
          <Typography align="left" variant="h6">
            Comments:
          </Typography>
          <Divider className="comments-divider" />
          {comments.length > 0 ? (
            comments.map((comment, i) => {
              return (
                <Typography key={i} align="left" paragraph variant="body1">
                  &#9679; {comment}
                </Typography>
              );
            })
          ) : (
            <Typography align="left" paragraph variant="body1">
              No comments have been made yet.
            </Typography>
          )}
          <TextField
            className="comment-input"
            inputProps={{
              maxLength: 280,
            }}
            size="small"
            label="Add a comment..."
            placeholder=""
            multiline
            helperText={`Max Character Limit: ${280 - commentState.length}`}
            value={commentState}
            variant="filled"
            onChange={(e) => {
              setCommentState(e.target.value);
              console.log(commentState);
            }}
          />
        </CardContent>
        <CardActions className="card-action-box">
          <Button
            disabled={commentState.length === 0}
            className="add-comment-button"
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => {
              if (commentState.length > 0) {
                addComment(_id, commentState);
                addCommentToState(
                  _id,
                  commentState,
                  setSwimlaneStates,
                  swimlaneStates,
                  status.title
                );
                setCommentState('');
              }
            }}
          >
            Add Comment
          </Button>
          {/* <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => {
              fetch('/test').then((res) => console.log(res));
            }}
          >
            Add Rating
          </Button> */}
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default SLCard;
