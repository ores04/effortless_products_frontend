import { Box, Container, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between">
          {/* Contact Info */}
          <Box>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 300, fontSize: '0.9rem', mb: 0.5 }}>
              Effortless
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Weberstr 4a
              <br />
              44789 Bochum
              <br />
              Deutschland
              <br />
              Tel.: +4917669876309
              <br />
              E-Mail: contact@effortless.de
            </Typography>
          </Box>

          {/* Legal Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 300, fontSize: '0.9rem', mb: 0.5 }}>
              Legal
            </Typography>
            <MuiLink component={RouterLink} to="/terms" color="text.secondary" variant="body2" sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Terms of Service (AGB)
            </MuiLink>
            <MuiLink component={RouterLink} to="/privacy" color="text.secondary" variant="body2" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              Privacy Policy (Datenschutz)
            </MuiLink>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
