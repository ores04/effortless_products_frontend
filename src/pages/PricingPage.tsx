import { Typography, Box } from '@mui/material';

export default function PricingPage() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pricing
      </Typography>
      <Typography variant="body1">
        Choose the plan that suits you best.
      </Typography>
    </Box>
  );
}
