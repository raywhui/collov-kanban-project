/**
 * POST
 * @desc adds new applicant to database
 * @param {Object} postData - data from state
 * @returs {Object} - JSON object of success
 */
const addNewApplicant = async (postData) => {
  const formData = new FormData();
  for (let stateData in postData) {
    formData.append(stateData, postData[stateData]);
  }
  const response = await fetch('/api/applicants', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};

/**
 * PUT
 * @desc multi-use updater for anything applicant related
 * @param {string} id - applicant id
 * @param {Object} updateData - data from state
 * @returs {Object} - JSON object of success
 */
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

/**
 * GET /files/:filename
 * @desc get applicant's resume
 * @param {string} filename - resume filename
 * @returs {Object} - JSON object of success
 */
const getResume = async (filename) => {
  // const response = await fetch(`/files/${filename}`);
  const response = await fetch(`/files/a57ce275bd6480f61bc70d011b48be33.pdf`);
  const data = await response.json();
  console.log(data);
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

export {
  addNewApplicant,
  updateApplicantDB,
  getResume,
  updateApplicantOrderDB,
};
