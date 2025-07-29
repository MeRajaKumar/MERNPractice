const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: 18,
        newsletter: true,
        terms: false,
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
        gender: Yup.string().required('Required'),
        terms: Yup.boolean()
          .oneOf([true], 'You must accept the terms and conditions')
          .required('Required'),
      }),
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <div className="name-fields">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        
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
        
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        
        <FormControl fullWidth margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </Select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="error-message">{formik.errors.gender}</div>
          )}
        </FormControl>
        
        <div className="age-slider">
          <InputLabel>Age: {formik.values.age}</InputLabel>
          <Slider
            id="age"
            name="age"
            value={formik.values.age}
            onChange={(e, value) => formik.setFieldValue('age', value)}
            min={13}
            max={100}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        
        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            aria-label="newsletter"
            name="newsletter"
            value={formik.values.newsletter}
            onChange={(e) => formik.setFieldValue('newsletter', e.target.value === 'true')}
          >
            <FormControlLabel value={true} control={<Radio />} label="Subscribe to newsletter" />
            <FormControlLabel value={false} control={<Radio />} label="Don't subscribe" />
          </RadioGroup>
        </FormControl>
        
        <FormControlLabel
          control={
            <Switch
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label={
            <span>
              I agree to the <a href="#terms">Terms and Conditions</a>
            </span>
          }
        />
        {formik.touched.terms && formik.errors.terms && (
          <div className="error-message">{formik.errors.terms}</div>
        )}
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={!formik.isValid}
        >
          Sign Up
        </Button>
      </form>
    );
  };