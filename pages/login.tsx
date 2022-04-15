import React from 'react'
import { TextField, Grid, InputLabel, OutlinedInput, Typography, Stack } from '@mui/material'
import { InputAdornment } from '@mui/material';
import { IconButton, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Meta from '../components/Meta';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Header from '../components/Header';

const Login = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const [checked, setChecked] = React.useState(true);

  const handleCheck = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <div>
      {/* <Header/> */}
      <Meta title={'Login - Recruitment Automation System'} />
      <Stack spacing={2} justifyContent="center" alignItems="center" sx={{minHeight:"70vh"}}>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <h1>Welcome!</h1>
          <h2>Sign in to</h2>
          <Typography variant='subtitle1' color="text.secondary">Recruitment Portal IIT Kanpur</Typography>
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <TextField id="username" label="Username" variant="outlined" />
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '37ch' }} variant="outlined">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              <Checkbox
                size="small"
                checked={checked}
                onChange={handleCheck}
                inputProps={{ 'aria-label': 'controlled' }}
              />Remember Me</Typography>
            <Typography variant="subtitle2" color="text.secondary"><span style={{ color: "blue" }}><Link href="/forgotPass">Forgot password?</Link></span></Typography>
          </Stack>
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <Button variant="contained">Sign In</Button>
        </FormControl>
        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
          <Typography>Don&apos;t have an account? <span style={{ color: "blue" }}><Link href="/signup">Sign Up</Link></span></Typography>
        </FormControl>
      </Stack>
    </div >

  )
}

Login.layout='Navigation'
export default Login
