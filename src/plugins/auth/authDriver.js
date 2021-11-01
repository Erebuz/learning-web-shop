module.exports = {
  request: function (req, token) {
    if (req.url.indexOf("refresh") !== -1) {
      this.drivers.http.setHeaders.call(this, req, {
        Authorization: "Bearer " + token,
      });
      let ref_token = localStorage.getItem("refresh_token");
      req.data = { refresh_token: ref_token };
    } else {
      this.drivers.http.setHeaders.call(this, req, {
        Authorization: "Bearer " + token,
      });
    }
  },

  response: function (res) {
    if (res.data && res.data.refresh_token) {
      localStorage.setItem("refresh_token", res.data.refresh_token);
    }
    return res.data?.access_token;
  },
};
