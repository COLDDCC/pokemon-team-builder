import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
const origin = 'http://127.0.0.1:4381';
const server = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--ignore-lock', '--host', '127.0.0.1', '--port', '4381'], { stdio: ['ignore', 'pipe', 'pipe'] });
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview did not start')), 15000);
    server.stdout.on('data', chunk => { if (chunk.toString().includes('4381')) { clearTimeout(timeout); resolve(); } });
    server.on('exit', code => { clearTimeout(timeout); reject(new Error(`Preview exited ${code}`)); });
  });
  mkdirSync('qa-output', { recursive: true });
  for (const [name, path] of [['home', '/'], ['populated-team', '/?v=1&team=pikachu,charizard,venusaur,blastoise,gengar,dragonite']]) {
    const chrome = await launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless', '--no-sandbox', '--no-zygote', '--single-process', '--use-gl=angle', '--use-angle=swiftshader', '--in-process-gpu'] });
    try {
      const result = await lighthouse(origin + path, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
      if (!result) throw new Error('No Lighthouse result');
      writeFileSync(`qa-output/lighthouse-${name}.json`, result.report);
      console.log(JSON.stringify({ page: name, categories: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score === null ? null : Math.round(value.score * 100)])), metrics: { lcp: result.lhr.audits['largest-contentful-paint'].numericValue, cls: result.lhr.audits['cumulative-layout-shift'].numericValue, tbt: result.lhr.audits['total-blocking-time'].numericValue } }));
    } finally { await Promise.resolve(chrome.kill()); }
  }
} finally { server.kill('SIGTERM'); }
