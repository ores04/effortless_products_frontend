import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function ConfirmMailPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <MailOutlineIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
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
          Check your email
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We've sent you a confirmation link. Please check your inbox and click the link to verify your account. 
          If you don't see it, check your spam folder.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ py: 1.5, px: 4 }}
        >
          Return to Login
        </Button>
      </Box>
    </Container>
  );
}
