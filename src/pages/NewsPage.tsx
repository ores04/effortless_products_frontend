import { Typography, Box } from '@mui/material';

export default function NewsPage() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        News
      </Typography>
      <Typography variant="body1">
        Latest updates and announcements will appear here.
      </Typography>
    </Box>
  );
}
