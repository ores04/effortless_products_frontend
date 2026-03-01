import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import DatasetCard from './DatasetCard';
import { datasetService } from '../services/datasetService';

interface HighlightItem {
  title: string;
  description: string;
  price: string;
  color: string;
  link: string;
}

const pastelColors = [
  '#E3F2FD', '#F3E5F5', '#E8F5E9', '#FFF3E0', 
  '#FFEBEE', '#E0F7FA', '#FCE4EC', '#F4F4F5'
];

export default function HighlightDatasets() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [datasets, setDatasets] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const publicDs = await datasetService.getPublicDatasets();
        
        // Randomly select up to 7 datasets
        const shuffled = [...publicDs].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 7);

        const mapped = selected.map(ds => {
          const hash = ds.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const color = pastelColors[hash % pastelColors.length];
          return {
            title: ds.name,
            description: ds.description || 'No description available',
            price: 'Sign in to unlock',
            color,
            link: '/datasets',
          };
        });

        setDatasets(mapped);
      } catch (err) {
        console.error('Failed to load highlighted datasets', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHighlights();
  }, []);

  useEffect(() => {
    if (datasets.length === 0) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 320 + 24; // Card max-width + gap

    const interval = setInterval(() => {
      // Check if we hit the end, add a buffer to reset gracefully
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [datasets]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 300, mb: 4 }}>
          Highlight Datasets
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : datasets.length === 0 ? (
           <Typography color="text.secondary">No datasets currently available to highlight.</Typography>
        ) : (
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
            {datasets.map((dataset, idx) => (
              <DatasetCard key={`${dataset.title}-${idx}`} {...dataset} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
