import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './AddCardForm.css';

const AddCardForm = (props) => {
  const [fileUploadState, setFileUploadState] = useState(null);
  const [applicantState, setApplicantState] = useState({
    name: '',
    email: '',
    resume: '',
  });

  return (
    <form id="add-card-form">
      <TextField
        required
        className="input"
        label="Name"
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setApplicantState({ ...applicantState, name: e.target.value });
          console.log(applicantState);
        }}
      />
      <TextField
        required
        className="input"
        label="Email"
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setApplicantState({ ...applicantState, email: e.target.value });
          console.log(applicantState);
        }}
      />
      <Button variant="outlined" component="label">
        <CloudUploadIcon />
        Upload Resume
        <input
          onChange={(e) => {
            setFileUploadState(e.target.files[0].name);
            setApplicantState({
              ...applicantState,
              resume: e.target.files[0].name,
            });
            console.log('file uploaded:', e.target.files[0].name);
          }}
          type="file"
          style={{ display: 'none' }}
          accept="application/pdf, .doc,.docx"
        />
      </Button>
      <Typography className="file-name" variant="subtitle">
        {fileUploadState ? fileUploadState : 'No File Uploaded'}
      </Typography>
      <Button
        className="upload-card"
        variant="contained"
        color="primary"
        component="label"
        // TODO: Set onCick to close modal
        onClick={() => console.log('test')}
      >
        Add Card
      </Button>
    </form>
  );
};

export default AddCardForm;
