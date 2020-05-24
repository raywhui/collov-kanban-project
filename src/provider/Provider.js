import React, { useState, useEffect } from 'react';

import Context from '../context/Context';

const getApplicantsUrl = '/api/applicants';

const applicantsList = async () => {
  const response = await fetch(getApplicantsUrl);
  const data = await response.json();
  return data;
};

// fetch(getApplicantsUrl)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const Provider = ({ children }) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let applicants = await applicantsList();
      console.log(applicants);
      await setStore(applicants);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated Store');
    console.log(store);
  }, [store]);

  return (
    <Context.Provider value={{ store, updateStore: setStore }}>
      {children}
    </Context.Provider>
  );
};
export default Provider;
