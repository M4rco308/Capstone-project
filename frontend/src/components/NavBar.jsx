import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Image, Form, FormControl } from "react-bootstrap";
import axios from "axios";

function NavBar({ searchBrand, setSearchBrand }) {
  const [user, setUser] = useState(null);

  //chk x utente loggato
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/auth/user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:4000/api/users/auth/google";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:4000/api/users/auth/logout";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MerkAuto</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Auto</Nav.Link>
          </Nav>


          {/*
           <Form className="mx-auto d-flex">
            <FormControl
              type="text"
              placeholder="Cerca marca..."
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />
          </Form>  */}

          <Nav className="align-items-center ms-auto">
            <Button as={Link} to="/new-car" variant="success" className="me-3">
              + Crea Annuncio
            </Button>

            {user ? (
              <>
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    roundedCircle
                    width="35"
                    height="35"
                    className="me-2 border border-light"
                  />
                )}
                <span className="text-light me-3">{user.name?.split(" ")[0] || "Utente"}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={handleLogin}>
                Login con Google
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;