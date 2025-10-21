import express from "express";
import passport from "passport";

const router = express.Router();

// login google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/",
  })
);

// ritorno utente loggato
router.get("/auth/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ message: "Non autenticato" });
});

// logout
router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173/");
  });
});

export default router;