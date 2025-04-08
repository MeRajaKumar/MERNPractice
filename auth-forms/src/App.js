import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">React Auth Forms</h2>
      <div className="mb-5">
        <h4>Login Form</h4>
        <LoginForm />
      </div>
      <div>
        <h4>Signup Form</h4>
        <SignupForm />
      </div>
    </Container>
  );
}

export default App;
