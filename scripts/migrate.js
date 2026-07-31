const fs = require('fs');
const path = require('path');

async function migrate() {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
  
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.error('Missing KV_REST_API_URL or UPSTASH_REDIS_REST_URL in .env.local');
    process.exit(1);
  }

  const contentPath = path.join(__dirname, '../content/content.json');
  if (!fs.existsSync(contentPath)) {
    console.error('No content.json found to migrate.');
    process.exit(1);
  }

  const data = fs.readFileSync(contentPath, 'utf8');
  
  console.log('Uploading content to Vercel KV / Upstash Redis...');
  
  const response = await fetch(`${url}/set/site-content`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: data
  });
  
  if (response.ok) {
    console.log('✅ Successfully migrated local content.json to Vercel KV!');
  } else {
    console.error('❌ Failed to migrate:', await response.text());
  }
}

migrate();
