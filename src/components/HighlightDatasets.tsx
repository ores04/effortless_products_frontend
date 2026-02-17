import { Box, Container, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import DatasetCard from './DatasetCard';

const datasets = [
  {
    title: 'Global Coffee Beans',
    description: 'Detailed analysis of coffee bean production, pricing, and origin data globally.',
    price: '$499',
    color: '#FFCDD2', // Pastel Red
    link: '/pricing',
  },
  {
    title: 'Organic Produce Trends',
    description: 'Consumer purchasing trends for organic fruits and vegetables in the EU market.',
    price: '$299',
    color: '#C8E6C9', // Pastel Green
    link: '/pricing',
  },
  {
    title: 'Dairy Alternatives',
    description: 'Market share and growth stats for plant-based milk, cheese, and yogurt.',
    price: '$349',
    color: '#BBDEFB', // Pastel Blue
    link: '/pricing',
  },
  {
    title: 'Snack Food Analytics',
    description: 'Comprehensive data on snack food consumption patterns and flavor preferences.',
    price: '$599',
    color: '#FFF9C4', // Pastel Yellow
    link: '/pricing',
  },
  {
    title: 'Spices & Herbs Market',
    description: 'Import/export volumes and pricing fluctuations for major global spices.',
    price: '$249',
    color: '#E1BEE7', // Pastel Purple
    link: '/pricing',
  },
];

export default function HighlightDatasets() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 320 + 24; // Card max-width + gap

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Highlight Datasets
        </Typography>
        
        <Box 
          ref={scrollRef}
          sx={{ 
            display: 'flex', 
            gap: 3, 
            overflowX: 'auto', 
            pb: 2,
            mx: -2,
            px: 2,
            alignItems: 'stretch', // Ensure equal height
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome/Safari
            msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            scrollBehavior: 'smooth',
          }}
        >
          {datasets.map((dataset) => (
            <DatasetCard key={dataset.title} {...dataset} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
