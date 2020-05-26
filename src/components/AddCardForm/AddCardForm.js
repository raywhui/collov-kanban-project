import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { addNewApplicant } from '../../apis';
import './AddCardForm.css';

const intialErrorState = {
  name: false,
  email: false,
  resume: false,
};

const AddCardForm = ({ setModalState, setSwimlaneStates, swimlaneStates }) => {
  const [fileUploadState, setFileUploadState] = useState(null);
  const [errorState, setErrorState] = useState(intialErrorState);
  const [applicantState, setApplicantState] = useState({
    name: '',
    email: '',
    resume: '',
  });

  return (
    <form id="add-card-form">
      <Typography className="file-name" variant="h6">
        Add New Applicant
      </Typography>
      <TextField
        required
        className="input"
        label="Name"
        variant="outlined"
        fullWidth
        error={errorState.name}
        onChange={(e) => {
          setApplicantState({ ...applicantState, name: e.target.value });
        }}
      />
      <TextField
        required
        className="input"
        label="Email"
        variant="outlined"
        fullWidth
        error={errorState.email}
        onChange={(e) => {
          setApplicantState({ ...applicantState, email: e.target.value });
        }}
      />
      <Button variant="outlined" component="label">
        <CloudUploadIcon />
        Upload Resume* (.doc,.docx.,.pdf)
        <input
          onChange={(e) => {
            setFileUploadState(e.target.files[0].name);
            setApplicantState({
              ...applicantState,
              resume: e.target.files[0],
            });
            console.log('file uploaded:', e.target.files[0]);
          }}
          type="file"
          name="file"
          style={{ display: 'none' }}
          accept="application/pdf, .doc,.docx"
        />
      </Button>
      <Typography className="file-name" variant="subtitle1">
        {fileUploadState ? fileUploadState : 'No File Uploaded'}
      </Typography>
      {errorState.resume ? 'Resume Required*' : ''}
      <Button
        className="upload-card"
        variant="contained"
        color="primary"
        component="label"
        onClick={async () => {
          const response = await addNewApplicant(applicantState);
          if (response.created) {
            const newAppliedSwimlane = swimlaneStates['Applied'];
            newAppliedSwimlane.push(response.applicant);
            setSwimlaneStates({
              ...swimlaneStates,
              Applied: newAppliedSwimlane,
            });
            setModalState(false);
            setErrorState(intialErrorState);
          } else {
            // Create error states if fails to send
            let newErrors = { ...intialErrorState };
            console.log(response);
            Object.keys(applicantState).forEach((label) => {
              if (!applicantState[label]) {
                newErrors[label] = true;
              }
            });
            setErrorState(newErrors);
          }
        }}
      >
        Add Card
      </Button>
    </form>
  );
};

export default AddCardForm;
