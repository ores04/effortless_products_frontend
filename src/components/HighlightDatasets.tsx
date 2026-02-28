import { Box, Container, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import DatasetCard from './DatasetCard';

const datasets = [
  {
    title: 'Edeka Product Catalog',
    description: 'Comprehensive product list with current shelf prices from major Edeka branches.',
    price: '€199',
    color: '#FFF9C4', // Pastel Yellow (Edeka has yellow/blue)
    link: '/pricing',
  },
  {
    title: 'Netto Marken-Discount',
    description: 'Full assortment pricing history for Netto stores across Germany.',
    price: '€149',
    color: '#FFCCBC', // Pastel Orange (Netto is yellow/red, close enough)
    link: '/pricing',
  },
  {
    title: 'Lidl Weekly Offers',
    description: 'Track price changes and special weekly offers from Lidl stores.',
    price: '€149',
    color: '#BBDEFB', // Pastel Blue (Lidl is blue/yellow/red)
    link: '/pricing',
  },
  {
    title: 'Aldi Nord & Süd',
    description: 'Combined dataset for Aldi Nord and Süd product pricing and availability.',
    price: '€179',
    color: '#E1BEE7', // Pastel Purple
    link: '/pricing',
  },
  {
    title: 'Rewe Market Data',
    description: 'Detailed shelf pricing and product availability for Rewe supermarkets.',
    price: '€199',
    color: '#C8E6C9', // Pastel Green (Rewe is red/white, but green implies fresh/market)
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
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
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
