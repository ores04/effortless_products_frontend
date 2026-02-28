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
        {/* Tryout */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>Tryout Plan</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>€9<Typography component="span" color="text.secondary">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                0 free dataset unlocks, 50 API requests per day.
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button 
                variant={subInfo?.plan === 'tryout' ? "outlined" : "contained"} 
                fullWidth 
                onClick={() => handleCheckout('tryout')}
                disabled={actionLoading !== null || subInfo?.plan === 'tryout'}
              >
                {actionLoading === 'tryout' ? 'Loading...' : subInfo?.plan === 'tryout' ? 'Current Plan' : 'Subscribe to Tryout'}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Go Plan */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'primary.main', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom color="primary.main">Go Plan</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>€29<Typography component="span" color="text.secondary">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                1 free dataset unlock per month, 250 requests per endpoint per day.
              </Typography>
            </CardContent>
             <Box sx={{ p: 2, pt: 0 }}>
              <Button 
                variant={subInfo?.plan === 'go' ? "contained" : "contained"} 
                fullWidth 
                color="primary"
                onClick={() => handleCheckout('go')}
                disabled={actionLoading !== null || subInfo?.plan === 'go'}
              >
                {actionLoading === 'go' ? 'Loading...' : subInfo?.plan === 'go' ? 'Current Plan' : 'Subscribe to Go'}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Pro Plan */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>Pro Plan</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>€89<Typography component="span" color="text.secondary">/mo</Typography></Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                5 free dataset unlocks per month, 1,000 API requests per day.
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button 
                variant={subInfo?.plan === 'pro' ? "outlined" : "contained"} 
                fullWidth 
                onClick={() => handleCheckout('pro')}
                disabled={actionLoading !== null || subInfo?.plan === 'pro'}
              >
                {actionLoading === 'pro' ? 'Loading...' : subInfo?.plan === 'pro' ? 'Current Plan' : 'Subscribe to Pro'}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Enterprise Plan */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>Enterprise</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>Custom</Typography>
               <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Pay as you go, discounts on dataset unlocks, dedicated support.
              </Typography>
            </CardContent>
             <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => window.location.href = 'mailto:hello@effortlessproducts.com'}
                >
                  Contact Us
                </Button>
              </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
