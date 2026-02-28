import { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DatabaseIcon from '@mui/icons-material/StorageOutlined';
import CodeIcon from '@mui/icons-material/CodeOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import ApiIcon from '@mui/icons-material/ApiOutlined';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import SellIcon from '@mui/icons-material/LocalOfferOutlined';

interface NodeData {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  spawnDelay: number;
  opacity: number;
  radius: number;
  offsetX: number;
  offsetY: number;
}

interface EdgeData {
  source: string;
  target: string;
  length: number;
}

const initialNodes: NodeData[] = [
  { id: 'db', label: 'Dataset', icon: 'Database', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 0, opacity: 0, radius: 45 },
  { id: 'meta', label: 'Metadata', icon: 'Code', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 300, opacity: 0, radius: 40 },
  { id: 'shop', label: 'Store', icon: 'Storefront', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 600, opacity: 0, radius: 45 },
  { id: 'api', label: 'API', icon: 'Api', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 900, opacity: 0, radius: 40 },
  { id: 'apple', label: 'Produce', icon: 'LocalGroceryStore', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 1200, opacity: 0, radius: 35 },
  { id: 'milk', label: 'Dairy', icon: 'Inventory', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 1500, opacity: 0, radius: 35 },
  { id: 'price', label: 'Pricing', icon: 'Sell', x: 0, y: 0, vx: 0, vy: 0, mass: 1, spawnDelay: 1800, opacity: 0, radius: 35 },
];

const edges: EdgeData[] = [
  { source: 'db', target: 'shop', length: 270 },
  { source: 'db', target: 'meta', length: 210 },
  { source: 'db', target: 'api', length: 240 },
  { source: 'shop', target: 'apple', length: 195 },
  { source: 'shop', target: 'milk', length: 195 },
  { source: 'shop', target: 'price', length: 210 },
  { source: 'meta', target: 'api', length: 225 },
];

export default function GraphAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const linesRef = useRef<{ [key: string]: SVGLineElement | null }>({});

  useEffect(() => {
    let animationFrameId: number;
    let width = containerRef.current?.clientWidth || 500;
    let height = containerRef.current?.clientHeight || 400;

    const nodes = initialNodes.map(n => ({
      ...n,
      x: width / 2 + n.offsetX,
      y: height / 2 + n.offsetY,
    }));

    const mouse = { x: null as number | null, y: null as number | null };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
        if (containerRef.current) {
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
        }
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();

    const friction = 0.88; // Slightly less friction for more fluid movement
    const centerGravity = 0.003; // Weaker pull to center
    const springTension = 0.015; // Much weaker attraction between nodes
    const nodeRepulsion = 8000; // Stronger repulsion to keep them apart
    const cursorRepulsion = 15000; // Strong anti-gravity force

    const tick = (timestamp: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const elapsed = timestamp - startTime;

      nodes.forEach(n => {
        if (elapsed > n.spawnDelay) {
          n.opacity = Math.min(1, n.opacity + 0.05);
        }
        if (n.opacity > 0) {
          // slight gravity toward center
          n.vx += (centerX - n.x) * centerGravity;
          n.vy += (centerY - n.y) * centerGravity;
        }
      });

      // Calculate edges (springs)
      edges.forEach(e => {
        const n1 = nodes.find(n => n.id === e.source);
        const n2 = nodes.find(n => n.id === e.target);
        if (n1 && n2 && n1.opacity > 0 && n2.opacity > 0) {
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - e.length) * springTension;
          
          n1.vx += ((dx / dist) * force) / n1.mass;
          n1.vy += ((dy / dist) * force) / n1.mass;
          n2.vx -= ((dx / dist) * force) / n2.mass;
          n2.vy -= ((dy / dist) * force) / n2.mass;
        }
      });

      // Node repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          if (n1.opacity > 0 && n2.opacity > 0) {
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDistance = n1.radius + n2.radius + 30; // buffer
            
            if (dist < minDistance) {
              let force = -nodeRepulsion / (dist * dist);
              force = Math.max(force, -100); // cap
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              
              n1.vx += fx / n1.mass;
              n1.vy += fy / n1.mass;
              n2.vx -= fx / n2.mass;
              n2.vy -= fy / n2.mass;
            }
          }
        }
      }

      // Cursor anti-gravity
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach(n => {
          if (n.opacity > 0) {
            const dx = n.x - mouse.x!;
            const dy = n.y - mouse.y!;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            
            if (dist < 200) {
              let force = cursorRepulsion / (dist * dist);
              force = Math.min(force, 100); // strong initial push but capped
              
              n.vx += (dx / dist) * force / n.mass;
              n.vy += (dy / dist) * force / n.mass;
            }
          }
        });
      }

      // Apply velocities and limits
      nodes.forEach(n => {
        n.vx *= friction;
        n.vy *= friction;
        n.x += n.vx;
        n.y += n.vy;

        // Keep within bounds roughly
        if (n.x < n.radius) { n.x = n.radius; n.vx *= -0.5; }
        if (n.x > width - n.radius) { n.x = width - n.radius; n.vx *= -0.5; }
        if (n.y < n.radius) { n.y = n.radius; n.vy *= -0.5; }
        if (n.y > height - n.radius) { n.y = height - n.radius; n.vy *= -0.5; }

        const el = nodesRef.current[n.id];
        if (el) {
          el.style.transform = `translate(${n.x - n.radius}px, ${n.y - n.radius}px) scale(${Math.min(1, n.opacity + 0.2)})`;
          el.style.opacity = n.opacity.toString();
        }
      });

      edges.forEach(e => {
        const n1 = nodes.find(n => n.id === e.source);
        const n2 = nodes.find(n => n.id === e.target);
        const line = linesRef.current[`${e.source}-${e.target}`];
        if (n1 && n2 && line) {
          line.setAttribute('x1', n1.x.toString());
          line.setAttribute('y1', n1.y.toString());
          line.setAttribute('x2', n2.x.toString());
          line.setAttribute('y2', n2.y.toString());
          
          const op = Math.min(n1.opacity, n2.opacity) * 0.4;
          line.style.opacity = op.toString();
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box 
        ref={containerRef} 
        sx={{ 
            position: 'relative', 
            width: '100%', 
            height: 500, 
            overflow: 'hidden',
            bgcolor: 'background.paper',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            cursor: 'crosshair'
        }}
    >
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {edges.map((e) => (
          <line
            key={`${e.source}-${e.target}`}
            ref={el => { linesRef.current[`${e.source}-${e.target}`] = el; }}
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="4 4"
            style={{ opacity: 0, transition: 'opacity 0.2s' }}
          />
        ))}
      </svg>
      {initialNodes.map(n => (
        <Paper
          key={n.id}
          ref={el => { nodesRef.current[n.id] = el; }}
          elevation={3}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: n.radius * 2,
            height: n.radius * 2,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#ffffff',
            border: '2px solid',
            borderColor: 'primary.light',
            opacity: 0,
            pointerEvents: 'none', // Critical: Let mouse events reach the container
            transition: 'opacity 0.1s',
            willChange: 'transform',
          }}
        >
          <Box sx={{ color: 'primary.main', display: 'flex' }}>
            {n.icon === 'Database' && <DatabaseIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'Code' && <CodeIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'Storefront' && <StorefrontIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'Api' && <ApiIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'LocalGroceryStore' && <LocalGroceryStoreIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'Inventory' && <InventoryIcon sx={{ fontSize: n.radius * 0.9 }} />}
            {n.icon === 'Sell' && <SellIcon sx={{ fontSize: n.radius * 0.9 }} />}
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
                fontSize: n.radius * 0.28, 
                fontWeight: 600, 
                color: 'text.secondary',
                mt: 0.5
            }}
          >
            {n.label}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
