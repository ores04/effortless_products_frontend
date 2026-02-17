import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const navItems = ['About', 'Team', 'Research', 'News', 'Resources', 'Outreach', 'Features', 'Calendar', 'Join us'];

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 2 }}>
          {/* Logo Section */}
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             {/* SVC Placeholder for the red wave logo */}
            <Box sx={{ width: 100, height: 40, border: '1px solid #1B5E20', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, color: '#1B5E20', fontSize: '0.75rem' }}>
                Logo svg
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', letterSpacing: 1, fontSize: '0.7rem', textTransform: 'uppercase' }}>
              The Center of Gravity
            </Typography>
          </Box>

          {/* Navigation Section */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                component={RouterLink}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.95rem' }}
              >
                {item}
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
