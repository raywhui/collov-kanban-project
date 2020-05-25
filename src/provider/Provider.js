import React, { useState, useEffect } from 'react';

import Context from '../context/Context';

// MOVE TO API FOLDER VVVV
const getApplicantsUrl = '/api/applicants';

const applicantsList = async () => {
  const response = await fetch(getApplicantsUrl);
  const data = await response.json();
  return data;
};
// MOVE TO API FOLDER  ^^^^^

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
