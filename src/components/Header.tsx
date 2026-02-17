import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'News', path: '/news' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Docs', path: '/docs' },
  { name: 'Calendar', path: '/calendar' },
];

export default function Header() {
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
             {/* Icon Placeholder */}
             <Button sx={{ minWidth: 'auto', p: 0.5 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: 'text.primary', mask: 'url(https://unpkg.com/simple-icons@v9/icons/lighthouse.svg) no-repeat center / contain', WebkitMask: 'url(https://unpkg.com/simple-icons@v9/icons/lighthouse.svg) no-repeat center / contain' }} />
             </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
