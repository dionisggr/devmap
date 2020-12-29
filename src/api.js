const baseURL = 'http://localhost:8000';

function getData() {
  return Promise.all([
    fetch(`${baseURL}/projects`),
    fetch(`${baseURL}/issues`)
  ])
  .then(response => Promise.all(response.map(res => {
    if (!res.ok) throw new Error('Could not fetch data.');
    return res.json();
  })))
  .catch(error => console.log(error));
};

function addProject(newProject) {
  return fetch(`${baseURL}/projects`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProject)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function editProject(id, values) {
  return fetch(`${baseURL}/projects/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function deleteProject(id) {
  return fetch(`${baseURL}/projects/${id}`, {
    method: 'DELETE'
  });
};

function addIssue(newIssue) {
  return fetch(`${baseURL}/issues`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newIssue)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function editIssue(id, values) {
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function deleteIssue(id) {
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'DELETE'
  })
  .catch(error => console.log(error));
};

function addUser(newUser) {
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function editUser(id, values) {
  return fetch(`${baseURL}/users/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json())
  .catch(error => console.log(error));
};

function deleteUser(id) {
  return fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE'
  })
  .catch(error => console.log(error));
};

function getUserById(id) {
  return fetch(`${baseURL}/users/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error));
};

const api = {
  getData,
  addProject,
  editProject,
  deleteProject,
  addIssue,
  editIssue,
  deleteIssue,
  addUser,
  editUser,
  deleteUser,
  getUserById,
};

export default api;