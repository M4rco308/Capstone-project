import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap";

function NewCar() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    description: "",
    images: [], // array per gli url delle foto
    sellerName: "",
    sellerEmail: "",
    newImageUrl: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // aggiornamento testo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // aggiunta url all array
  const handleAddImage = () => {
    if (formData.newImageUrl.trim() === "") return;
    setFormData({
      ...formData,
      images: [...formData.images, formData.newImageUrl.trim()],
      newImageUrl: "",
    });
  };

  //rimozione da array
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // invio form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (
      !formData.title ||
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.price ||
      !formData.sellerName ||
      !formData.sellerEmail ||
      formData.images.length === 0
    ) {
      setErrorMsg("Compila tutti i campi obbligatori e inserisci almeno un'immagine.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/cars", {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
      });
      setSuccessMsg("Annuncio creato con successo!");
      setFormData({
        title: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        description: "",
        images: [],
        sellerName: "",
        sellerEmail: "",
        newImageUrl: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Errore durante la creazione dell'annuncio.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Nuovo annuncio</h2>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Titolo annuncio"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="brand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Marca auto"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="model">
              <Form.Label>Modello</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Modello auto"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="year">
              <Form.Label>Anno</Form.Label>
              <Form.Control
                type="number"
                name="year"
                placeholder="Anno"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="price">
              <Form.Label>Prezzo (€)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Prezzo"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Descrizione dell'auto"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="sellerName">
              <Form.Label>Nome venditore</Form.Label>
              <Form.Control
                type="text"
                name="sellerName"
                placeholder="Il tuo nome"
                value={formData.sellerName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sellerEmail">
              <Form.Label>Email venditore</Form.Label>
              <Form.Control
                type="email"
                name="sellerEmail"
                placeholder="La tua email"
                value={formData.sellerEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Inserisci URL immagini</Form.Label>
          <Row className="mb-2">
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="inserisci qui il link dell'immagine"
                name="newImageUrl"
                value={formData.newImageUrl}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Button variant="primary" type="button" onClick={handleAddImage}>
                Aggiungi immagine
              </Button>
            </Col>
          </Row>

          {/* anteprima foto */}
          {formData.images.length > 0 && (
            <Row className="mt-3">
              {formData.images.map((img, idx) => (
                <Col md={3} key={idx} className="mb-2">
                  <Image src={img} thumbnail />
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-1"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    Rimuovi
                  </Button>
                </Col>
              ))}
            </Row>
          )}
        </Form.Group>

        <Button variant="success" type="submit">
          Crea Annuncio
        </Button>
      </Form>
    </Container>
  );
}

export default NewCar;