import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

// Render the same React components as the browser; menu and hours have one source.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render, pages, restaurantData, menuData } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile(resolve('dist/index.html'), 'utf8');
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const page of pages) {
    const url = `https://lavashmi.com${page.path}`;
    const graph = { '@context': 'https://schema.org', '@graph': [restaurantData, {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title,
      description: page.description, about: { '@id': 'https://lavashmi.com/#restaurant' }, inLanguage: 'en-US',
    }, ...(page.path === '/menu' ? [menuData] : [])] };
    const meta = `<meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lavash Lebanese Cuisine" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://lavashmi.com/new_lavash_tray.png" />
    <meta property="og:image:alt" content="Lavash Lebanese Cuisine sandwich tray" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="https://lavashmi.com/new_lavash_tray.png" />
    ${page.path === '/404' ? '<meta name="robots" content="noindex" />' : ''}
    <script type="application/ld+json">${JSON.stringify(graph).replaceAll('<', '\\u003c')}</script>`;
    const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace('</head>', `${meta}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`);
    const target = page.path === '/' ? 'dist/index.html' : page.path === '/404' ? 'dist/404.html' : `dist${page.path}.html`;
    await mkdir(resolve(target, '..'), { recursive: true });
    await writeFile(target, html);
    console.log(`Prerendered ${page.path}`);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter((page: { path: string }) => page.path !== '/404').map((page: { path: string }) => `\n  <url><loc>https://lavashmi.com${page.path}</loc></url>`).join('')}\n</urlset>\n`);
} finally {
  await server.close();
}
