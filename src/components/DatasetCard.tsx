import { Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface DatasetCardProps {
  title: string;
  description: string;
  price: string;
  color: string;
  link: string;
}

export default function DatasetCard({ title, description, price, color, link }: DatasetCardProps) {
  return (
    <Card 
      sx={{ 
        minWidth: 280, 
        maxWidth: 320, 
        bgcolor: color, 
        borderRadius: 4, 
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Typography variant="h6" color="primary.dark" sx={{ fontWeight: 600 }}>
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          component={RouterLink} 
          to={link} 
          size="small" 
          sx={{ 
            color: 'text.primary', 
            bgcolor: 'rgba(255,255,255,0.5)', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
            fontWeight: 600
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
