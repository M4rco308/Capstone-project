import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap";

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        description: "",
        images: [],
        sellerName: "",
        sellerEmail: "",
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // caricamento dettagli
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/cars/${id}`);
                setFormData(res.data);
                setPreviewImages(res.data.images || []);
            } catch (error) {
                console.error("Errore nel caricamento dell'auto:", error);
            }
        };
        fetchCar();
    }, [id]);

    // gestione campi di testo
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // gestione immagini
    const handleImageChange = (e) => {
        const urls = e.target.value.split(",").map((url) => url.trim());
        setFormData({ ...formData, images: urls });
        setPreviewImages(urls);
    };

    // x aggiornamento
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        try {
            await axios.put(`http://localhost:4000/api/cars/${id}`, formData);
            setSuccessMsg("Annuncio aggiornato con successo!");
            setTimeout(() => navigate(`/car/${id}`), 1500);
        } catch (error) {
            console.error("Errore durante l'aggiornamento:", error);
            setErrorMsg("Errore durante l'aggiornamento dell'annuncio.");
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Modifica annuncio auto</h2>

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
                                value={formData.sellerEmail}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="images">
                    <Form.Label>Inserisci l'url dell'immagine </Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.images.join(", ")}
                        onChange={handleImageChange}
                    />
                </Form.Group>

                {/* anteprima foto */}
                {previewImages.length > 0 && (
                    <Row className="mb-3">
                        {previewImages.map((img, idx) => (
                            <Col md={3} key={idx} className="mb-2">
                                <Image src={img} thumbnail />
                            </Col>
                        ))}
                    </Row>
                )}

                <Button variant="warning" type="submit">
                    Salva Modifiche
                </Button>
            </Form>
        </Container>
    );
}

export default EditCar;