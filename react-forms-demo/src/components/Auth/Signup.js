import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions 
} from '@mui/material';

export default function Signup() {
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: { 
      name: '', 
      email: '', 
      mobile: '',
      password: '', 
      confirmPassword: '' 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: values => {
      setOpenDialog(true);
    },
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Full Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        
        <TextField
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          fullWidth
          margin="normal"
          id="mobile"
          name="mobile"
          label="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        
        <TextField
          fullWidth
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 3, mb: 2 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          Create Account
        </Button>
      </form>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Account Created Successfully!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Name:</strong> {formik.values.name}<br />
            <strong>Email:</strong> {formik.values.email}<br />
            <strong>Mobile:</strong> {formik.values.mobile}<br /><br />
            Your account has been successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}