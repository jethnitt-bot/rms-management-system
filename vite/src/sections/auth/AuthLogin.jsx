
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================ JWT - LOGIN ============================ //

export default function AuthLogin({ isDemo = false }) {
const navigate = useNavigate();
const [checked, setChecked] = React.useState(false);

const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => {
setShowPassword(!showPassword);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
};

return (
<>
<Formik
initialValues={{
email: '',
password: '',
submit: null
}}
validationSchema={Yup.object().shape({
email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
password: Yup.string()
.required('Password is required')
.test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
.max(255, 'Password must be less than 255 characters')
})}
// 🟢 Handle Login Submission & Validation
onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
try {
// 🟢 បំប្លែង Email ទៅជាអក្សរតូច ដើម្បីកុំឱ្យប្រកាន់ Case-sensitivity
const inputEmail = values.email.toLowerCase();
const inputPassword = values.password;

// 🟢 Check Fake Credentials (អាចដូរតាមចិត្ត)
if (inputEmail !== 'jethnitt@gmail.com' || inputPassword !== 'Nit130905') {
throw new Error('Email ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ!');
}

// 🟢 បើត្រូវ៖ បង្កើត Token រក្សាទុក រួចរុញទៅ Dashboard
localStorage.setItem('token', 'sample_jwt_token_12345');
setStatus({ success: true });
setSubmitting(false);

navigate('/');
} catch (err) {
// 🔴 បើខុស៖ បង្ហាញ Error Alert
setStatus({ success: false });
setErrors({ submit: err.message || 'ការចូលប្រើប្រាស់បរាជ័យ!' });
setSubmitting(false);
}
}}
>
{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
<form noValidate onSubmit={handleSubmit}>
<Grid container spacing={3}>
{/* 🔴 បង្ហាញ Alert ពណ៌ក្រហមប្រាប់ User ពេលវាយខុស */}
{errors.submit && (
<Grid size={12}>
<Alert severity="error">{errors.submit}</Alert>
</Grid>
)}

<Grid size={12}>
<Stack sx={{ gap: 1 }}>
<InputLabel htmlFor="email-login">Email Address</InputLabel>
<OutlinedInput

Nai phanit ណៃផានិត:
id="email-login"
type="email"
value={values.email}
name="email"
autoComplete="off" // 🟢 បិទ Chrome Auto-fill
onBlur={handleBlur}
onChange={handleChange}
placeholder="Enter email address"
fullWidth
error={Boolean(touched.email && errors.email)}
/>
</Stack>
{touched.email && errors.email && (
<FormHelperText error id="standard-weight-helper-text-email-login">
{errors.email}
</FormHelperText>
)}
</Grid>

<Grid size={12}>
<Stack sx={{ gap: 1 }}>
<InputLabel htmlFor="password-login">Password</InputLabel>
<OutlinedInput
fullWidth
error={Boolean(touched.password && errors.password)}
id="password-login"
type={showPassword ? 'text' : 'password'}
value={values.password}
name="password"
autoComplete="new-password" // 🟢 បិទ Chrome Auto-fill
onBlur={handleBlur}
onChange={handleChange}
endAdornment={
<InputAdornment position="end">
<IconButton
aria-label="toggle password visibility"
onClick={handleClickShowPassword}
onMouseDown={handleMouseDownPassword}
edge="end"
color="secondary"
>
{showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
</IconButton>
</InputAdornment>
}
placeholder="Enter password"
/>
</Stack>
{touched.password && errors.password && (
<FormHelperText error id="standard-weight-helper-text-password-login">
{errors.password}
</FormHelperText>
)}
</Grid>

<Grid sx={{ mt: -1 }} size={12}>
<Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
<FormControlLabel
control={
<Checkbox
checked={checked}
onChange={(event) => setChecked(event.target.checked)}
name="checked"
color="primary"
size="small"
/>
}
label={<Typography variant="h6">Keep me sign in</Typography>}
/>
<Link variant="h6" component={RouterLink} to="#" color="text.primary">
Forgot Password?
</Link>
</Stack>
</Grid>

<Grid size={12}>
<AnimateButton>
<Button
disableElevation
disabled={isSubmitting}
fullWidth
size="large"
type="submit"
variant="contained"
color="primary"
>
Login
</Button>
</AnimateButton>
</Grid>
</Grid>
</form>
)}
</Formik>
</>
);
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };