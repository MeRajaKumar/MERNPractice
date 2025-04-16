const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        remember: false,
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      }),
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <div className="form-options">
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <a href="#forgot-password">Forgot password?</a>
        </div>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={!formik.isValid}
        >
          Login
        </Button>
      </form>
    );
  };