const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, 
  });

  return res.status(200).json({ message: "Logged out" });
};

module.exports ={logout}