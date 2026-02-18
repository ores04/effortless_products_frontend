import { Box } from '@mui/material';
import Hero from '../components/Hero';
import HighlightDatasets from '../components/HighlightDatasets';
import ValueProposition from '../components/ValueProposition';

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <ValueProposition />
      <HighlightDatasets />
    </Box>
  );
}
