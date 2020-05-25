// newSwimlane is array
const changeCardOrder = (
  currentCardIndex,
  newCardIndex,
  setSwimlaneStates,
  swimlaneStates,
  oldStatus
) => {
  const swimLane = swimlaneStates[oldStatus];
  if (currentCardIndex > newCardIndex || currentCardIndex < newCardIndex) {
    const removed = swimLane.splice(currentCardIndex, 1);
    swimLane.splice(newCardIndex, 0, removed[0]);
  } else {
    return;
  }
  setSwimlaneStates({
    ...swimlaneStates,
    [oldStatus]: swimLane,
  });
};

const changeSwimlanes = (
  applicantId,
  oldStatus,
  newStatus,
  setSwimlaneStates,
  swimlaneStates
) => {
  const index = swimlaneStates[oldStatus].findIndex(
    (data) => data._id === applicantId
  );
  const removed = swimlaneStates[oldStatus].splice(index, 1);
  removed[0].status.title = newStatus;
  swimlaneStates[newStatus].push(removed[0]);
  setSwimlaneStates({
    ...swimlaneStates,
    [newStatus]: swimlaneStates[newStatus],
    [oldStatus]: swimlaneStates[oldStatus],
  });
};

export { changeSwimlanes, changeCardOrder };
