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
};

export default {
  getData
};