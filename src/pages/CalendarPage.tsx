import { Typography, Box } from '@mui/material';

export default function CalendarPage() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar
      </Typography>
      <Typography variant="body1">
        Upcoming events and schedules.
      </Typography>
    </Box>
  );
}
