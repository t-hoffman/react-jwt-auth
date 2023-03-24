import useAuth from 'hooks/useAuth';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/auth/signin';
const initialForm = { username: '', password: '' }

const SigninForm = ({ from }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(false)
  const userRef = useRef();
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        credentials: 'include'
      };

      const response = await (await fetch(LOGIN_URL, options)).json();

      if (!response.accessToken) {
        setForm(initialState)
        return setError(true)
      }

      setAuth(response)
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={{ span: 5, offset: 3 }}>
          <Card bg="light" text="dark">
            <Card.Header>
              <Card.Title>Sign In</Card.Title>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">Invalid login credentials, please try again.</Alert>}
              <Form autoComplete="off" onSubmit={handleSubmit}>
                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="name@yoursite.com"
                    autoComplete="off"
                    onChange={handleChange}
                    value={form.user}
                    ref={userRef}
                  />
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder=" "
                    autoComplete="off"
                    onChange={handleChange}
                    value={form.password}
                  />
                </FloatingLabel>
                <Button type="submit" variant="dark" className="float-end">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SigninForm;