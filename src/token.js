const token = {
  get() {
    return window.localStorage.getItem('authToken');
  }
  ,
  save(token) {
    return window.localStorage.setItem('authToken', token);
  }
};

module.exports = token;