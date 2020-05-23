import React from 'react';
import Header from '../../components/Header';
import KanbanContainer from '../../components/KanbanContainer';
import Swimlane from '../../components/Swimlane';
import SLCard from '../../components/SLCard';

const swimlaneLabels = [
  'Applied',
  'Phone Screen',
  'On site',
  'Offered',
  'Accepted',
  'Rejected',
];
const testUserData = [
  {
    name: 'Jon Snow',
    contact: 'j.snow@thenorth.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
  {
    name: 'Arya Stark',
    contact: 'a.stark@thenorth.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
  {
    name: 'Bran Stark',
    contact: 'b.the.broken@GofT.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
  {
    name: 'Bran Stark',
    contact: 'b.the.broken@GofT.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
  {
    name: 'Bran Stark',
    contact: 'b.the.broken@GofT.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
  {
    name: 'Bran Stark',
    contact: 'b.the.broken@GofT.com',
    resume: 'drive.google.cool.co.what',
    status: '',
  },
];

const Home = (props) => {
  return (
    <div>
      <Header />
      <KanbanContainer>
        {swimlaneLabels.map((label, i) => {
          return (
            <Swimlane title={label} key={i}>
              {testUserData.map((data, j) => {
                return <SLCard applicantData={data} key={j} />;
              })}
            </Swimlane>
          );
        })}
      </KanbanContainer>
    </div>
  );
};

export default Home;
