// controllers/sessionController.js
export const visit = (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.send(`Visited ${req.session.views} times`);
};

export const loginSession = (req, res) => {
  req.session.user = "Payal";
  res.send("User stored in session");
};

export const profileSession = (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user}`);
  } else {
    res.send("No Session Found");
  }
};

export const logoutSession = (req, res) => {
  req.session.destroy(() => {
    res.send("Session Destroyed");
  });
};