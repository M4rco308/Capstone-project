import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// generazione token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// login google
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Token Google mancante" });
    }

    // verifica token con google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: "Token Google non valido" });
    }

    // info utente da google
    const { sub: googleId, name, email, picture: avatar } = payload;

    // ricerca utente nel db
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({ googleId, name, email, avatar });
      console.log("Nuovo utente Google creato:", email);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    console.error("Errore login Google:", error);
    res.status(500).json({ message: "Errore server durante il login Google" });
  }
};