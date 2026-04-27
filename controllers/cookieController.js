// controllers/cookieController.js
export const setCookie = (req, res) => {
  res.cookie("username", "Payal");
  res.send("Cookie Set Successfully");
};

export const getCookie = (req, res) => {
  res.json(req.cookies);
};

export const clearCookie = (req, res) => {
  res.clearCookie("username");
  res.send("Cookie Cleared");
};