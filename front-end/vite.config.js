import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
import Sitemap from 'vite-plugin-sitemap'; // Changed to default export
import { createHtmlPlugin } from 'vite-plugin-html';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  {path: '/shop', name: 'Shop' },
];

const routePaths = routes.map(route => route.path);

export default defineConfig({
 

  plugins: [
    
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    Sitemap({
      hostname: 'https://vibes-ecommerce-website.vercel.app/', 
      dynamicRoutes: routePaths,
      generateRobotsTxt: true,
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Vibes | E-commerce Website | Shop | Online Store',
          description: 'This is Vibes E-commerce Website, an online store where you can shop for a variety of products. Explore our collection and enjoy a seamless shopping experience.',
        },
      },
    }),
    visualizer({
      filename: 'bundle-report.html',
      template: 'treemap',
      open: true,
    }),
  ],

 ssgOptions: {
    includedRoutes() {
      return routePaths;
    }
  },

  build: {
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('framer-motion') || id.includes('gsap')) return 'animations';
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'state';
            return 'vendor';
          }
        },
      },
    },
  },
});
