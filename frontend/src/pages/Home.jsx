import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home({ searchBrand, setSearchBrand }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/cars");
        setCars(res.data);
      } catch (error) {
        console.error("Errore caricamento auto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <p className="text-center mt-4">Caricamento in corso</p>;

  // filtro per auto
  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <Container className="mt-4">

      <h1 className="text-center mb-4">Benvenuto in MerkAuto! </h1>
      <h3 className="text-center mb-4"> Lo specialista di auto usate</h3>

      <Row className="mb-3 ">
        <Col md={6}>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Cerca qui la tua prossima auto!"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      {/* card tutte auto */}
      <Row>
        {filteredCars.length === 0 && (
          <p className="text-center">Nessuna auto disponibile</p>
        )}
        {filteredCars.map((car) => (
          <Col md={4} className="mb-4" key={car._id}>
            <Card className="h-100 shadow-sm">
              {car.images && car.images[0] && (
                <Card.Img
                  variant="top"
                  src={car.images[0]}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{car.title}</Card.Title>
                <Card.Text>
                  <strong>Marca:</strong> {car.brand} <br />
                  <strong>Modello:</strong> {car.model} <br />
                  <strong>Anno:</strong> {car.year} <br />
                  <strong>Prezzo:</strong> €{car.price}
                </Card.Text>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/car/${car._id}`)}
                  >
                    Dettagli
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/edit-car/${car._id}`)}
                  >
                    Modifica
                  </Button>
                </div>
              </Card.Body>

              <Card.Footer>
                <small className="text-muted">
                  Venditore: {car.sellerName}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;