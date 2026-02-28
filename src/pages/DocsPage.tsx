import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const navItems = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'data-model', label: 'Data Model' },
  { id: 'rate-limits', label: 'Rate Limits' },
  { id: 'products', label: 'Products API' },
];

const contentMap: Record<string, string> = {
  quickstart: `
# Quickstart

Welcome to the **Effortless Products API**. Our API allows you to access unlocked dataset information seamlessly.

To get started:
1. Create an account and navigate to the **API Keys** section in your dashboard.
2. Generate a new API Key (remember to save it immediately, as we won't show the full key again).
3. Browse the **Datasets** catalog and unlock the ones you need.
4. Start making requests to the \`/v1/\` endpoints.

The API is structured around REST. All requests must be made over HTTPS. Responses are served in JSON.
`,
  authentication: `
# Authentication

All \`/v1/\` endpoints require API Key authentication.
The API key must be provided in the \`Authorization\` header as a Bearer token.

### Example Request

\`\`\`bash
curl -X GET "https://api.effortlessproducts.com/v1/datasets/{dataset_id}/products" \\
     -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

> **Note:** Do not share your API keys in publicly accessible areas such as GitHub or client-side code.
`,
  'data-model': `
# Data Model

Understanding how entities logistically connect in **Effortless Products** is essential to leveraging the API successfully. 

Our data catalog revolves around three primary tables: \`store_meta\`, \`dataset\`, and \`dataset_product\`.

### Hierarchy Overview

1. **\`store_meta\`** (Store)
   The top-level entity representing a brand, shop, or physical entity (e.g., "Apple", "Walmart").
   *Primary Key:* \`id\`

2. **\`dataset\`** (Dataset Collection)
   Belongs to a \`store_meta\`. It acts as a specific snapshot, collection, or chronological scrape of products from that store. A single store can have multiple datasets over time.
   *Primary Key:* \`id\`
   *Foreign Key:* \`store_id\` -> \`store_meta.id\`

3. **\`dataset_product\`** (Individual Product)
   Belongs to a \`dataset\`. Represents a single manufactured item or sku.
   *Primary Key:* \`id\`
   *Foreign Key:* \`dataset_id\` -> \`dataset.id\`

### Standard Relationship Flow

\`\`\`
[ store_meta ] 1 ----- * [ dataset ] 1 ----- * [ dataset_product ]
\`\`\`

When using the API, you typically retrieve a catalog of datasets (representing different stores or categories), obtain the corresponding \`dataset.id\`, and then query the \`dataset_product\` table to fetch the actual product listings inside it.
`,
  'rate-limits': `
# Rate Limits

Rate limits are applied based on your current subscription plan. 

| Plan | Request Limit |
|---|---|
| **Free / Tryout** | 50 requests per day |
| **Go** | 250 requests per endpoint per day (1,500 total/month) |
| **Pro** | 1,000 requests per day (10,000 total/month) |
| **Enterprise** | Unlimited (Pay as you go) |

If you exceed your rate limit, the API will respond with a \`429 Too Many Requests\` status.
Every request is logged to your dashboard analytics so you can track your usage.
`,
  products: `
# Products API

These endpoints allow you to search, filter, and fetch products from your unlocked datasets.

### List Products
\`GET /v1/datasets/:id/products\`
Fetch a paginated list of all products in a dataset. Supports \`limit\` and \`offset\` query parameters.

### Get Single Product
\`GET /v1/datasets/:id/products/:product_id\`
Fetch a single product by ID within a dataset.

### Search Products
\`GET /v1/datasets/:id/products/search?q={query}\`
Full-text search over product name and brand within a dataset. Results are ranked by relevance.

### Filter by Category
\`GET /v1/datasets/:id/products/category/:category\`
Filter all products in a dataset by top-level category. Returns subcategory and tag data for further client-side filtering.

### Dataset Info
\`GET /v1/datasets/:id/info\`
Fetch dataset details securely using an API key.

### Store Products
\`GET /v1/stores/:id/products\`
Fetch all products across datasets under a specific store. Supports filtering.

### Latest Store Dataset
\`GET /v1/stores/:id/datasets/latest\`
Fetch the most recently captured dataset for a specific store.
`
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <Paper 
        elevation={0} 
        sx={{ 
          width: 250, 
          flexShrink: 0, 
          borderRight: '1px solid', 
          borderColor: 'divider',
          borderRadius: 0,
          bgcolor: 'background.default',
          position: 'sticky',
          top: 64,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            Getting Started
          </Typography>
        </Box>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItem disablePadding key={item.id}>
              <ListItemButton 
                selected={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
                sx={{ 
                  py: 1, 
                  px: 3,
                  '&.Mui-selected': {
                    bgcolor: 'primary.50',
                    borderRight: '3px solid',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.100',
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontSize: '0.9rem', 
                    fontWeight: activeSection === item.id ? 600 : 400 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 4, md: 8 }, maxWidth: 900 }}>
        <Box 
          sx={{ 
            '& h1, & h2, & h3, & h4, & h5, & h6': { fontWeight: 300 },
            '& h1': { ...Typography.prototype },
            '& pre': { 
              bgcolor: '#1a1a1a', 
              p: 2, 
              borderRadius: 2, 
              overflowX: 'auto',
              color: '#f8f8f2'
            },
            '& code': { fontFamily: 'monospace' },
            '& table': { 
              width: '100%', 
              borderCollapse: 'collapse', 
              mb: 4 
            },
            '& th, & td': { 
              border: '1px solid', 
              borderColor: 'divider', 
              p: 1.5, 
              textAlign: 'left' 
            },
            '& th': { bgcolor: 'grey.50' }
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {contentMap[activeSection]}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
}
