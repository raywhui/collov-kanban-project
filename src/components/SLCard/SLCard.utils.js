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

export { addComment, addCommentToState };
