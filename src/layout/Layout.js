import { ACTIONS } from "context/AuthProvider";
import useAuth from "hooks/useAuth";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Navbar</Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            </Nav.Item>
            {state.accessToken && (
              <Nav.Item>
                <Nav.Link onClick={() => navigate("user")}>User</Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link onClick={() => navigate("test")} className="ml-auto">
                Test
              </Nav.Link>
            </Nav.Item>
            {state.accessToken && (
              <Nav.Item className="ms-auto">
                <Nav.Link onClick={() => dispatch({ type: ACTIONS.SIGN_OUT })}>
                  Sign out
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Container className="p-3">{<Outlet />}</Container>
    </>
  );
};

export default Layout;
