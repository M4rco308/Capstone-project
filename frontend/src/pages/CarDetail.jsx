import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Carousel, Button, Spinner } from "react-bootstrap";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/cars/${id}`);
        setCar(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dell'auto:", error);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler eliminare questo annuncio?")) return;

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:4000/api/cars/${id}`);
      alert("Annuncio eliminato con successo!");
      navigate("/");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      alert("Errore durante l'eliminazione dell'annuncio.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" size="sm" /> Caricamento in corso
      </div>
    );
  if (!car) return <p className="text-center mt-4">Auto non trovata.</p>;

  return (
    <Container className="mt-5">
      <Row>
        {/* carosello foto */}
        <Col md={6} className="mb-4">
          {car.images && car.images.length > 0 ? (
            <Carousel variant="dark" interval={3000} className="shadow-sm rounded">
              {car.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    src={img}
                    alt={`Immagine ${idx + 1}`}
                    className="d-block w-100 rounded"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Nessuna immagine disponibile.</p>
          )}
        </Col>

        {/* dettagli auto a dx */}
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">
                {car.title}
              </Card.Title>
              <Card.Text as="div">
                <p>
                  <strong>Marca:</strong> {car.brand}
                </p>
                <p>
                  <strong>Modello:</strong> {car.model}
                </p>
                <p>
                  <strong>Anno:</strong> {car.year}
                </p>
                <p>
                  <strong>Prezzo:</strong> €{car.price.toLocaleString()}
                </p>
                <p>
                  <strong>Descrizione:</strong> <br />
                  {car.description || "Nessuna descrizione disponibile."}
                </p>
                <hr />
                <p>
                  <strong>Venditore:</strong> {car.sellerName}
                </p>
                <p>
                  {/* per contatto */}
                  <strong>Email contatto:</strong>{" "}
                  <a href={`mailto:${car.sellerEmail}`}>{car.sellerEmail}</a>
                </p>
              </Card.Text>

              <div className="mt-3 d-flex justify-content-end">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Eliminazione..." : "Elimina Annuncio"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CarDetail;