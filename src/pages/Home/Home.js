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
    initialSLStates[data.status].push(data);
  });

  useEffect(() => {
    console.log('state change');
  }, [swimlaneStates]);

  useEffect(() => {
    console.log(currentCardIndex);
    console.log(newCardIndex);

    if (currentCardIndex > newCardIndex) {
      console.log('%cThis sjould be moved up', 'color: green');
    } else if (currentCardIndex < newCardIndex) {
      console.log('%cThis sjould be moved down', 'color: green');
    } else {
      console.log('%cDont do anything', 'color: green');
      console.log('%cCurrentIndex:' + currentCardIndex, 'color: green');
      console.log('%cNewIndex:' + newCardIndex, 'color: green');
    }
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
                  setCurrentCardIndex={setCurrentCardIndex}
                  setNewCardIndex={setNewCardIndex}
                />
              ))}
              {/* {applicants
                .filter((data) => data.status === label)
                .map((data, j) => (
                  <SLCard applicantData={data} key={j} />
                ))*/}
              {applicants.filter((data) => data.status === label).length === 0
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
