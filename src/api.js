

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
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newProject)
  })
  .then(res => res.json());
};

function editProject(id, values) {
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteProject(id) {
  const token = window.localStorage.getItem('authToken');
  return fetch(`${baseURL}/projects/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function addIssue(newIssue) {
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newIssue)
  })
  .then(res => res.json());
};

function editIssue(id, values) {
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteIssue(id) {
  const token = window.localStorage.getItem('authToken');
  return fetch(`${baseURL}/issues/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function addUser(newUser) {
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
  })
  .then(res => res.json());
};

function editUser(id, values) {
  const token = window.localStorage.getItem('authToken');
  if (!token) Promise.reject(new Error('missing authorization'));
  return fetch(`${baseURL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
  .then(res => res.json());
};

function deleteUser(id) {
  const token = window.localStorage.getItem('authToken');
  return fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE',
    headers: {'Authorization': `Bearer ${token}`}
  });
};

function getUserById(id) {
  const token = window.localStorage.getItem('authToken');
  return fetch(`${baseURL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
};

function login(attempt) {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attempt)
  })
  .then(res => res.json());
};

function refreshToken() {
  const token = window.localStorage.getItem('authToken');
  return fetch(`${baseURL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json());
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
  login,
  refreshToken
};

export default api;