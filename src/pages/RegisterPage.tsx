import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
    }

    try {
      await register(email, password);
      // Depending on API behavior, we might redirect to login or home if auto-logged in
      // The context implementation assumes auto-login (returns token)
      navigate('/dashboard'); 
    } catch (err) {
      // Error is handled in context
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 300,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2
          }}
        >
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && <Alert severity="error" sx={{ mt: 2 }}>{passwordError}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MuiLink component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
