import { updateApplicantDB } from '../../apis';

const addComment = (id, comment) => {
  const req = {
    comments: comment,
  };
  updateApplicantDB(id, req);
};

const addCommentToState = (
  id,
  comment,
  setSwimlaneStates,
  swimlaneStates,
  status
) => {
  if (comment.length > 0 && comment.length <= 280) {
    const index = swimlaneStates[status].findIndex((data) => data._id === id);
    swimlaneStates[status][index].comments.push(comment);
    setSwimlaneStates({
      ...swimlaneStates,
    });
  }
};

const downloadResume = (filename) => {
  setTimeout(() => {
    const response = {
      file: `http://localhost:3001/files/${filename}`,
    };
    window.open(response.file);
  }, 100);
};

export { addComment, addCommentToState, downloadResume };
