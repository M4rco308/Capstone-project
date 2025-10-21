import Car from "../models/Car.js";

// creazione nuovo annuncio
export const createCar = async (req, res) => {
  try {
    const {
      title,
      brand,
      model,
      year,
      price,
      description,
      images,
      sellerName,
      sellerEmail,
    } = req.body;

    if (!title || !brand || !model || !year || !price || !sellerName || !sellerEmail) {
      return res
        .status(400)
        .json({ message: "Tutti i campi obbligatori devono essere compilati" });
    }

    // + nel db
    const car = await Car.create({
      title,
      brand,
      model,
      year: Number(year),
      price: Number(price),
      description,
      images,
      sellerName,
      sellerEmail,
    });

    res.status(201).json(car);
  } catch (error) {
    console.error("Errore creazione annuncio:", error);
    res
      .status(500)
      .json({ message: "Errore durante la creazione dell'annuncio" });
  }
};

// tutte le auto
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    console.error("Errore recupero auto:", error);
    res
      .status(500)
      .json({ message: "Errore durante il recupero delle auto" });
  }
};

// singola auto
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto non trovata" });
    res.json(car);
  } catch (error) {
    console.error("Errore recupero auto singola:", error);
    res
      .status(500)
      .json({ message: "Errore durante il recupero dell'auto" });
  }
};

// aggiornamento auto
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Auto non trovata" });
    }

    res.json(updatedCar);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'auto:", error);
    res
      .status(500)
      .json({ message: "Errore durante l'aggiornamento dell'auto" });
  }
};

// eliminazione auto
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Auto non trovata" });

    await car.deleteOne();
    res.json({ message: "Auto eliminata con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione dell'auto:", error);
    res
      .status(500)
      .json({ message: "Errore durante l'eliminazione dell'auto" });
  }
};