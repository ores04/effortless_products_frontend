import { Box, Container, Stack, Typography, Paper, Button } from '@mui/material';
import PricingCard from '../components/PricingCard';

const tiers = [
  {
    title: 'Occasional',
    price: '€49',
    features: [
      'Access to standard datasets',
      'Data refreshed monthly',
      'Standard support',
      'Commercial license',
    ],
    highlighted: false,
  },
  {
    title: 'Weekly Updates',
    price: '€199',
    features: [
      'Access to all datasets',
      'Guaranteed weekly updates',
      'Priority email support',
      'Extended commercial license',
      'API Access',
    ],
    highlighted: true,
  },
  {
    title: 'Daily Updates',
    price: '€499',
    features: [
      'Access to all datasets',
      'Guaranteed daily updates',
      '24/7 Priority support',
      'Enterprise license',
      'Full API Access',
      'Custom data requests',
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
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
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                One-Time Purchase
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                Need a specific dataset for a one-off project? You can purchase and download any individual dataset directly from our catalog.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Prices range from €50 to €500 per dataset depending on complexity and volume.
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
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 6 }}>
            Subscription Plans
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="stretch">
            {tiers.map((tier) => (
              <Box key={tier.title} sx={{ flex: 1, width: '100%' }}>
                <PricingCard {...tier} />
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
