import { Box, Button, Card, CardContent, CardActions, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText?: string;
  highlighted?: boolean;
  planId?: string;
  onSelect?: (planId: string) => void;
  loading?: boolean;
}

export default function PricingCard({ 
  title, 
  price, 
  features, 
  buttonText = 'Choose Plan', 
  highlighted = false,
  planId,
  onSelect,
  loading = false,
}: PricingCardProps) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        position: 'relative',
        border: highlighted ? '2px solid' : '1px solid',
        borderColor: highlighted ? 'primary.main' : 'divider',
        boxShadow: highlighted ? 4 : 1,
        transform: highlighted ? 'scale(1.05)' : 'none',
        zIndex: highlighted ? 1 : 0,
      }}
    >
      {highlighted && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12, 
            bgcolor: 'primary.main', 
            color: 'white', 
            px: 1, 
            py: 0.5, 
            borderRadius: 1, 
            fontSize: '0.75rem', 
            fontWeight: 'bold' 
          }}
        >
          POPULAR
        </Box>
      )}
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700, color: highlighted ? 'primary.main' : 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 800, mb: 3 }}>
          {price}
          <Typography component="span" variant="body1" color="text.secondary" sx={{ fontWeight: 400 }}>
            /mo
          </Typography>
        </Typography>
        
        <List dense>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          variant={highlighted ? 'contained' : 'outlined'} 
          fullWidth 
          size="large"
          sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
          onClick={() => onSelect && planId && onSelect(planId)}
          disabled={loading}
        >
          {loading ? 'Redirecting...' : buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
