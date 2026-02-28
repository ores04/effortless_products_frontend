import { useState } from 'react';
import { Box, Container, Stack, Typography, Paper, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import { billingService } from '../services/billingService';
import { useAuth } from '../context/AuthContext';

const tiers = [
  {
    title: 'Tryout',
    price: '€9',
    features: [
      '0 free dataset unlocks',
      '50 API requests per day',
    ],
    highlighted: false,
    planId: 'tryout',
  },
  {
    title: 'Go',
    price: '€29',
    features: [
      '1 free dataset unlock per month',
      '250 requests per endpoint per day',
      '1,500 requests per endpoint per month',
      'Pay as you go for overages',
    ],
    highlighted: true,
    planId: 'go',
  },
  {
    title: 'Pro',
    price: '€89',
    features: [
      '5 free dataset unlocks per month',
      '1,000 API requests per day',
      '10,000 requests per month',
      'Pay as you go for overages',
    ],
    highlighted: false,
    planId: 'pro',
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    priceSuffix: '',
    buttonText: 'Contact Us',
    features: [
      'Pay as you go',
      'Discounts on dataset unlocks',
      'Dedicated support',
    ],
    highlighted: false,
    planId: 'enterprise',
  },
];

export default function PricingPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'enterprise') {
      window.location.href = 'mailto:hello@effortlessproducts.com';
      return;
    }

    if (!user || !token) {
      // Prompt user to login first
      navigate('/login?redirect=/pricing');
      return;
    }

    setLoadingPlan(planId);
    setError(null);
    try {
      const { checkout_url } = await billingService.createSubscriptionCheckout(planId, token);
      // Redirect directly to Stripe Checkout
      window.location.href = checkout_url;
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout. Please try again later.');
      setLoadingPlan(null);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Choose the plan that fits your data needs. Pay per dataset or subscribe for continuous updates.
          </Typography>
        </Box>

        {/* Section 1: One-Time Purchase */}
        <Paper elevation={0} sx={{ p: 6, mb: 10, bgcolor: 'grey.50', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 300 }}>
                One-Time Purchase
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                Need a specific dataset for a one-off project? You can purchase and download any individual dataset directly from our catalog.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                €39 per Dataset and €99 for large datasets.
              </Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', md: 'auto' }, textAlign: { xs: 'left', md: 'right' } }}>
              <Button variant="outlined" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
                Browse Catalog
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* Section 2: Subscriptions */}
        <Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 300, textAlign: 'center', mb: 6 }}>
            Subscription Plans
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>{error}</Alert>}
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="stretch">
            {tiers.map((tier) => (
              <Box key={tier.title} sx={{ flex: 1, width: '100%' }}>
                <PricingCard 
                  {...tier} 
                  onSelect={handleSelectPlan} 
                  loading={loadingPlan === tier.planId} 
                />
              </Box>
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            All prices exclude VAT. Cancel anytime.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
