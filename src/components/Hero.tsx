import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GraphAnimation from './GraphAnimation';

export default function Hero() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} alignItems="center">
          {/* Text Content */}
          <Box sx={{ flex: 1, textAlign: 'left', zIndex: 2 }}>
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
              Comprehensive Grocery Product Datasets
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, lineHeight: 1.5, fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            >
              Access high-quality, up-to-date data for your e-commerce or market analysis needs.
            </Typography>
            <Button
              component={RouterLink}
              to="/datasets"
              variant="contained"
              size="large"
              sx={{
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              View Datasets
            </Button>
          </Box>

          {/* Graph Animation */}
          <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{
              position: 'absolute', width: '120%', height: '120%', bgcolor: 'primary.50',
              borderRadius: '50%', top: '-10%', right: '-20%', filter: 'blur(60px)', opacity: 0.6, zIndex: 0
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 700 }}>
              <GraphAnimation />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
