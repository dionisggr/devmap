const baseURL = 'http://localhost:8000';

function getData() {
  return Promise.all([
    fetch(`${baseURL}/projects`),
    fetch(`${baseURL}/issues`)
  ])
  .then(response => Promise.all(response.map(res => {
    if (!res.ok) throw new Error('Could not fetch data.');
    return res.json();
  })));
};

function addProject(newProject) {
  return fetch(`${baseURL}/projects`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProject)
  })
  .then(res => res.json());
};

function editProject(id, values) {
  return fetch(`${baseURL}/projects/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json());
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
  .then(res => res.json());
};

function editIssue(id, values) {
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteIssue(id) {
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'DELETE'
  });
};

function addUser(newUser) {
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
  })
  .then(res => res.json());
};

function editUser(id, values) {
  return fetch(`${baseURL}/users/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteUser(id) {
  return fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE'
  });
};

function getUserById(id) {
  return fetch(`${baseURL}/users/${id}`)
    .then(res => res.json())
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