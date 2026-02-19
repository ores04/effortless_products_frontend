import { AppBar, Toolbar, Typography, Box, Button, Container, Menu, MenuItem, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'News', path: '/news' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Docs', path: '/docs' },
  { name: 'Calendar', path: '/calendar' },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 2 }}>
          {/* Logo Section */}
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <Box component="img" src={logo} alt="Effortless Logo" sx={{ height: 40, mb: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 1, fontSize: '0.7rem', textTransform: 'uppercase' }}>
              Effortless Products
            </Typography>
          </Box>

          {/* Navigation Section */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.95rem' }}
              >
                {item.name}
              </Button>
            ))}

            {/* Auth Section */}
            {isAuthenticated ? (
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>{user?.email}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button component={RouterLink} to="/login" variant="outlined" color="primary" size="small">
                  Login
                </Button>
                <Button component={RouterLink} to="/register" variant="contained" color="primary" size="small">
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
