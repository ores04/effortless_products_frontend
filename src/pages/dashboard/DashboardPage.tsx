import { Typography, Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Usage Summary
      </Typography>
      <Typography variant="body1">
        Your usage statistics will appear here.
      </Typography>
    </Box>
  );
}
