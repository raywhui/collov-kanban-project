const addNewApplicant = async (postData) => {
  const response = await fetch('/api/applicants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const updateApplicantDB = async (id, updateData) => {
  const response = await fetch(`/api/applicants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const updateApplicantOrderDB = async (status, updateData) => {
  const response = await fetch(`/api/applicants/${status}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export { addNewApplicant, updateApplicantDB, updateApplicantOrderDB };
