import { useEffect, useState } from 'react';
import { Typography, Box, Paper, CircularProgress, Alert, Button, Grid, Card, CardContent, Divider, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../../context/AuthContext';
import { billingService, type SubscriptionInfo } from '../../services/billingService';

export default function BillingPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subInfo, setSubInfo] = useState<SubscriptionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchBilling = async () => {
      if (!token) return;
      try {
        const info = await billingService.getBillingInfo(token);
        setSubInfo(info);
      } catch (err: any) {
        setError(err.message || 'Failed to open billing details');
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, [token]);

  const handleCheckout = async (plan: string) => {
    if (!token) return;
    setActionLoading(plan);
    setError(null);
    try {
      const { checkout_url } = await billingService.createSubscriptionCheckout(plan, token);
      window.location.href = checkout_url;
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout process');
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
        Billing & Subscription
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Current Plan</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                {subInfo?.plan || 'Free'}
              </Typography>
              {subInfo?.status === 'active' && (
                <Chip icon={<CheckCircleIcon />} label="Active" color="success" size="small" />
              )}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body1" color="text.secondary">
          You are currently on the {subInfo?.plan || 'Free'} plan. Upgrade to access more features and datasets.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Available Upgrades
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Go Plan</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>€199<Typography component="span" color="text.secondary">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Guaranteed weekly updates, API Access, and more.
              </Typography>
              <Button 
                variant={subInfo?.plan === 'go' ? "outlined" : "contained"} 
                fullWidth 
                onClick={() => handleCheckout('go')}
                disabled={actionLoading !== null || subInfo?.plan === 'go'}
              >
                {actionLoading === 'go' ? 'Loading...' : subInfo?.plan === 'go' ? 'Current Plan' : 'Subscribe to Go'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Pro Plan</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>€499<Typography component="span" color="text.secondary">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Guaranteed daily updates, Enterprise license, Custom requests.
              </Typography>
              <Button 
                variant={subInfo?.plan === 'pro' ? "outlined" : "contained"} 
                color="primary"
                fullWidth 
                onClick={() => handleCheckout('pro')}
                disabled={actionLoading !== null || subInfo?.plan === 'pro'}
              >
                {actionLoading === 'pro' ? 'Loading...' : subInfo?.plan === 'pro' ? 'Current Plan' : 'Subscribe to Pro'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
