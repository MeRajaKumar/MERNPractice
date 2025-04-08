import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Form as BootstrapForm, InputGroup, Row, Col } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const SignupForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({ success: null, message: '' });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
    acceptTerms: false
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Must contain uppercase, lowercase, number and special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    gender: Yup.string()
      .required('Gender is required'),
    birthDate: Yup.date()
      .max(new Date(), 'Birth date cannot be in the future')
      .required('Birth date is required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Signup form submitted', values);
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus({ success: true, message: 'Account created successfully!' });
      resetForm();
      setSubmitting(false);
    }, 1500);
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

          <Row className="mb-3">
            <Col md={6}>
              <BootstrapForm.Group>
                <BootstrapForm.Label>First Name</BootstrapForm.Label>
                <Field
                  name="firstName"
                  type="text"
                  as={BootstrapForm.Control}
                  isInvalid={touched.firstName && !!errors.firstName}
                  placeholder="First name"
                />
                <ErrorMessage name="firstName" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>
            </Col>
            <Col md={6}>
              <BootstrapForm.Group>
                <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                <Field
                  name="lastName"
                  type="text"
                  as={BootstrapForm.Control}
                  isInvalid={touched.lastName && !!errors.lastName}
                  placeholder="Last name"
                />
                <ErrorMessage name="lastName" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>
            </Col>
          </Row>

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
            <BootstrapForm.Text muted>
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </BootstrapForm.Text>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
            <InputGroup>
              <Field
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                as={BootstrapForm.Control}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                placeholder="Confirm password"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
            <ErrorMessage name="confirmPassword" component={BootstrapForm.Text} className="text-danger" />
          </BootstrapForm.Group>

          <Row className="mb-3">
            <Col md={6}>
              <BootstrapForm.Group>
                <BootstrapForm.Label>Gender</BootstrapForm.Label>
                <Field
                  name="gender"
                  as={BootstrapForm.Select}
                  isInvalid={touched.gender && !!errors.gender}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Field>
                <ErrorMessage name="gender" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>
            </Col>
            <Col md={6}>
              <BootstrapForm.Group>
                <BootstrapForm.Label>Birth Date</BootstrapForm.Label>
                <Field
                  name="birthDate"
                  type="date"
                  as={BootstrapForm.Control}
                  isInvalid={touched.birthDate && !!errors.birthDate}
                />
                <ErrorMessage name="birthDate" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <BootstrapForm.Group className="mb-3">
            <Field
              name="acceptTerms"
              type="checkbox"
              as={BootstrapForm.Check}
              label="I accept the terms and conditions"
              isInvalid={touched.acceptTerms && !!errors.acceptTerms}
            />
            <ErrorMessage name="acceptTerms" component={BootstrapForm.Text} className="text-danger" />
          </BootstrapForm.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="w-100"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;