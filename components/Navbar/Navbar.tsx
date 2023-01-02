import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import style from "./navBar.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/user/userSlice";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import Upload from "../Upload";
import { useRouter } from "next/router";

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [search, setSearch] = useState<string>("");
  //
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  const router = useRouter();
  //

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="/img/play.png" alt="" className={style.brand} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">PlayShare</Nav.Link>
              <Nav.Link href="/video/random">Explore</Nav.Link>
              <Nav.Link href="/video/trends">Trends</Nav.Link>
              {!currentUser && (
                <>
                  <NavDropdown title="Come in" id="navbarScrollingDropdown">
                    <NavDropdown.Item
                      href="/auth/register"
                      className="text-dark"
                    >
                      Sign Up
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/auth/login" className="text-dark">
                      Login
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {currentUser && (
                <>
                  <Nav.Link onClick={handleShow}>Upload Video</Nav.Link>
                </>
              )}
            </Nav>
            {currentUser && (
              <>
                <Nav className="ms-auto">
                  <Nav.Link onClick={logOut}>log Out</Nav.Link>
                </Nav>
              </>
            )}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={() => router.push(`/video/search/${search}`)}
                variant="outline-light"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Upload show={show} setShow={setShow} />
    </>
  );
}

export default NavBar;
