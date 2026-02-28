import { Typography, Box } from '@mui/material';

export default function CalendarPage() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 300,
          color: 'text.primary',
          mb: 2,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          lineHeight: 1.2
        }}
      >
        Calendar
      </Typography>
      <Typography variant="body1">
        Upcoming events and schedules.
      </Typography>
    </Box>
  );
}
