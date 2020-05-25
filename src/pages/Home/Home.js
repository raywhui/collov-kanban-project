import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header';
import KanbanContainer from '../../components/KanbanContainer';
import Swimlane from '../../components/Swimlane';
import SLCard from '../../components/SLCard';
import Context from '../../context';

const swimlaneLabels = [
  'Applied',
  'Phone Screen',
  'On site',
  'Offered',
  'Accepted',
  'Rejected',
];

const initialSLStates = {
  Applied: [],
  'Phone Screen': [],
  'On site': [],
  Offered: [],
  Accepted: [],
  Rejected: [],
};

const Home = (props) => {
  const [swimlaneStates, setSwimlaneStates] = useState(initialSLStates);
  const [currentCardIndex, setCurrentCardIndex] = useState('');
  const [newCardIndex, setNewCardIndex] = useState('');

  const { store: applicants } = useContext(Context);

  swimlaneLabels.forEach((data) => {
    initialSLStates[data] = [];
  });
  applicants.forEach((data) => {
    initialSLStates[data.status.title].push(data);
  });

  useEffect(() => {
    console.log('state change');
  }, [swimlaneStates]);

  // Tracks card order changes
  useEffect(() => {
    console.log(currentCardIndex);
    console.log(newCardIndex);
  }, [currentCardIndex, newCardIndex]);

  return (
    <div>
      <Header />
      <KanbanContainer>
        {swimlaneLabels.map((label, i) => {
          return (
            <Swimlane
              title={label}
              key={i}
              setSwimlaneStates={setSwimlaneStates}
              swimlaneStates={swimlaneStates}
              currentCardIndex={currentCardIndex}
              newCardIndex={newCardIndex}
            >
              {swimlaneStates[label].map((data, j) => (
                <SLCard
                  applicantData={data}
                  key={j}
                  cardIndex={j}
                  setSwimlaneStates={setSwimlaneStates}
                  swimlaneStates={swimlaneStates}
                  setCurrentCardIndex={setCurrentCardIndex}
                  setNewCardIndex={setNewCardIndex}
                />
              ))}
              {applicants.filter((data) => data.status.title === label)
                .length === 0
                ? 'No Cards Yet :('
                : ''}
            </Swimlane>
          );
        })}
      </KanbanContainer>
    </div>
  );
};

export default Home;
