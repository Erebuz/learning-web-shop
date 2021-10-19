module.exports = {
  request: function (req, token) {
    this.drivers.http.setHeaders.call(this, req, {
      Authorization: "Bearer " + token,
    });
  },

  response: function (res) {
    return res.data?.access_token;
  },
};
