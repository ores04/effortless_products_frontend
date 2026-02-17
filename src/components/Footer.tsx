import { Box, Container, Stack, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between">
          {/* Contact Info */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.9rem', mb: 0.5 }}>
              The Center of Gravity
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Blegdamsvej 17
              <br />
              2100 Copenhagen
              <br />
              Denmark
              <br />
              Tel. +45 35325334
            </Typography>
          </Box>

          {/* Supported By */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Supported by:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
               {/* Sponsor Logo Placeholder */}
              <Box sx={{ width: 150, height: 60, bgcolor: '#f5f5f5', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Typography variant="caption" color="text.secondary">Sponsor Logo</Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
