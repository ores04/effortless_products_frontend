import { Box, Container, Typography } from '@mui/material';

export default function ValueProposition() {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 300 }}>
            Real Data. Real Accuracy.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 300 }}>
            We don't scrape websites. This is actual market data.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
