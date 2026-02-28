import { Box, Container, Stack, Typography } from '@mui/material';

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

        </Stack>
      </Container>
    </Box>
  );
}
