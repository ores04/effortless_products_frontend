import { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function BillingSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // You can optionally extract a session ID or payment intent from URL parameters if passed from Stripe
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a real application, you might want to verify the session with your backend
    // For now, we just simulate a short loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 4, border: '1px solid', borderColor: 'divider', maxWidth: 500, width: '100%' }}>
        {loading ? (
          <Box sx={{ py: 4 }}>
            <CircularProgress size={60} sx={{ mb: 4, color: 'primary.main' }} />
            <Typography variant="h6" color="text.secondary">
              Verifying your secure payment...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
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
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Thank you for your purchase. Your account has been updated successfully.
              You will receive a confirmation email shortly.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/dashboard')}
                sx={{ px: 4, borderRadius: 2 }}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/dashboard/billing')}
                sx={{ px: 4, borderRadius: 2 }}
              >
                View Billing
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
