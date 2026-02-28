import { Typography, Box, Paper, Chip, Stack, Link as MuiLink } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const categories = {
  announcement: { label: 'Announcement', color: 'primary' as const },
  product: { label: 'Product Update', color: 'success' as const },
  company: { label: 'Company', color: 'info' as const },
  research: { label: 'Research', color: 'secondary' as const },
};

// TODO: Replace with real data fetched from API or CMS
const featuredArticle: any = null;
const articles: any[] = [];

export default function NewsPage() {
  return (
    <Box sx={{ my: { xs: 4, md: 8 }, maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 } }}>
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
        News & Updates
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 8, fontWeight: 300, maxWidth: 600 }}>
        The latest product announcements, company updates, and research from the Effortless team.
      </Typography>

      {!featuredArticle && articles.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 4, bgcolor: 'grey.50', border: '1px dashed', borderColor: 'divider' }}>
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 300 }}>
            Check back soon for our latest news and announcements.
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <Box sx={{ mb: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                    borderColor: 'text.disabled'
                  }
                }}
              >
                <Box 
                  component={Link}
                  to={`/news/${featuredArticle.id}`}
                  sx={{ flex: '1 1 50%', textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      height: { xs: 250, md: '100%' },
                      backgroundImage: `url(${featuredArticle.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 50%', p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Chip 
                      label={categories[featuredArticle.category as keyof typeof categories].label} 
                      color={categories[featuredArticle.category as keyof typeof categories].color} 
                      size="small" 
                      sx={{ fontWeight: 600, borderRadius: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {featuredArticle.date}
                    </Typography>
                  </Stack>
                  
                  <MuiLink 
                    component={Link} 
                    to={`/news/${featuredArticle.id}`}
                    color="text.primary"
                    underline="none"
                    sx={{ 
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 300, mb: 2, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                      {featuredArticle.title}
                    </Typography>
                  </MuiLink>
                  
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.6, fontSize: '1.1rem' }}>
                    {featuredArticle.summary}
                  </Typography>

                  <MuiLink 
                    component={Link} 
                    to={`/news/${featuredArticle.id}`}
                    color="primary"
                    underline="hover"
                    sx={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}
                  >
                    Read full article <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </MuiLink>
                </Box>
              </Paper>
            </Box>
          )}

          {/* Grid of Articles */}
          {articles.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 4 }}>
              {articles.map((article) => (
                <Box key={article.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box 
                    component={Link}
                    to={`/news/${article.id}`}
                    sx={{ 
                      textDecoration: 'none',
                      display: 'block',
                      borderRadius: 3,
                      overflow: 'hidden',
                      mb: 3,
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        display: 'block',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${article.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        }
                      }}
                    />
                  </Box>

                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Chip 
                      label={categories[article.category as keyof typeof categories].label} 
                      color={categories[article.category as keyof typeof categories].color} 
                      variant="outlined"
                      size="small" 
                      sx={{ fontWeight: 600, borderRadius: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {article.date}
                    </Typography>
                  </Stack>

                  <MuiLink 
                    component={Link} 
                    to={`/news/${article.id}`}
                    color="text.primary"
                    underline="none"
                    sx={{ '&:hover': { color: 'primary.main' } }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 300, lineHeight: 1.3, mb: 1.5 }}>
                      {article.title}
                    </Typography>
                  </MuiLink>

                  <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                    {article.summary}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
