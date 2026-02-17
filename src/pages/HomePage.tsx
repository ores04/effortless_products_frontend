import { Typography, Box, Button } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Effortless Products
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
        Start building your amazing application.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" size="large">
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
