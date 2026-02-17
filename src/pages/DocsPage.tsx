import { Typography, Box } from '@mui/material';

export default function DocsPage() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1">
        Explore our guides and API references.
      </Typography>
    </Box>
  );
}
