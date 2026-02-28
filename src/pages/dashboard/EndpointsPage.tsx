import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface EndpointDoc {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  response: string; // JSON string representation
}

const endpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/api/v1/stores',
    description: 'Returns a list of stores.',
    response: `[
  {
    "id": "uuid",
    "store_name": "Store Name",
    "chain_name": "Chain",
    "store_code": "CODE",
    "address_line1": "Address",
    "city": "City",
    "latitude": 12.34,
    "longitude": 56.78,
    "is_active": true
  }
]`
  },
  {
    method: 'GET',
    path: '/api/v1/datasets',
    description: 'Returns a list of datasets.',
    response: `[
  {
    "id": "uuid",
    "store_id": "uuid",
    "owner_id": "uuid",
    "name": "Dataset Name",
    "description": "Description",
    "snapshot_date": "date",
    "source_url": "url",
    "import_method": "method",
    "status": "active",
    "product_count": 100,
    "error_message": null,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]`
  },
  {
    method: 'GET',
    path: '/api/v1/datasets/{id}/products',
    description: 'Returns a list of products in a dataset.',
    params: [
      { name: 'id', type: 'path', required: true, description: 'The unique identifier of the dataset.' }
    ],
    response: `{
  "products": [
    {
      "id": "uuid",
      "dataset_id": "uuid",
      "sku": "SKU123",
      "barcode": "123456789",
      "name": "Product Name",
      "brand": "Brand",
      "category": "Category",
      "price": 9.99,
      "currency_code": "USD"
    }
  ]
}`
  },
  {
    method: 'GET',
    path: '/api/v1/datasets/{id}/products/search',
    description: 'Returns search results.',
    params: [
      { name: 'id', type: 'path', required: true, description: 'The unique identifier of the dataset.' },
      { name: 'q', type: 'query', required: true, description: 'Search query string.' }
    ],
    response: `{
  "results": [
    {
      "id": "uuid",
      "name": "Product Name",
      ...
    }
  ]
}`
  }
];

export default function EndpointsPage() {
  return (
    <Box>
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
        API Endpoints
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Reference documentation for available API endpoints.
      </Typography>

      <Box>
        {endpoints.map((endpoint, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: '8px !important', '&:before': { display: 'none' }, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <Chip 
                  label={endpoint.method} 
                  color={endpoint.method === 'GET' ? 'primary' : 'secondary'} 
                  size="small" 
                  sx={{ fontWeight: 400, minWidth: 60 }} 
                />
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 400, flexGrow: 1 }}>
                  {endpoint.path}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
                  {endpoint.description.substring(0, 50)}{endpoint.description.length > 50 ? '...' : ''}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {endpoint.description}
              </Typography>

              {endpoint.params && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 400, mb: 1 }}>Parameters</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                          <TableCell>Name</TableCell>
                          <TableCell>In</TableCell>
                          <TableCell>Required</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {endpoint.params.map((param) => (
                          <TableRow key={param.name}>
                            <TableCell sx={{ fontFamily: 'monospace' }}>{param.name}</TableCell>
                            <TableCell>{param.type}</TableCell>
                            <TableCell>{param.required ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{param.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 400, mb: 1 }}>Response Example</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', overflowX: 'auto' }}>
                  <pre style={{ margin: 0, fontSize: '0.85rem' }}>
                    {endpoint.response}
                  </pre>
                </Paper>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
