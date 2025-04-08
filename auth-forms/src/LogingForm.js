import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Form as BootstrapForm, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({ success: null, message: '' });

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Login form submitted', values);
    // Simulate API call
    setTimeout(() => {
      if (values.email === 'user@example.com' && values.password === 'password') {
        setSubmitStatus({ success: true, message: 'Login successful!' });
        resetForm();
      } else {
        setSubmitStatus({ success: false, message: 'Invalid credentials' });
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          {submitStatus.message && (
            <Alert variant={submitStatus.success ? 'success' : 'danger'}>
              {submitStatus.message}
            </Alert>
          )}

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Email address</BootstrapForm.Label>
            <Field
              name="email"
              type="email"
              as={BootstrapForm.Control}
              isInvalid={touched.email && !!errors.email}
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component={BootstrapForm.Text} className="text-danger" />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Password</BootstrapForm.Label>
            <InputGroup>
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                as={BootstrapForm.Control}
                isInvalid={touched.password && !!errors.password}
                placeholder="Password"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
            <ErrorMessage name="password" component={BootstrapForm.Text} className="text-danger" />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <Field
              name="rememberMe"
              type="checkbox"
              as={BootstrapForm.Check}
              label="Remember me"
            />
          </BootstrapForm.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="w-100"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;