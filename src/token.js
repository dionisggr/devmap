const token = {
  get() {
    return window.sessionStorage.getItem('authToken');
  }
  ,
  save(token) {
    return window.sessionStorage.setItem('authToken', token);
  }
};

module.exports = token;