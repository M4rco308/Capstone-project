import mongoose from "mongoose";
import 'dotenv/config';

export async function connectDB() {
  console.log("Avvio connessione al DB..."); // chk se prova a connettersi
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connessione al DB avvenuta con successo!");
  } catch (error) {
    console.error("Errore connessione al DB:", error);
  }
}