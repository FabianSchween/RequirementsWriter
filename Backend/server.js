const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const STORE_PATH = path.join(__dirname, 'data', 'store.json');

function ensureStore() {
  const directory = path.dirname(STORE_PATH);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(
      STORE_PATH,
      JSON.stringify(
        {
          projects: [],
          requirements: []
        },
        null,
        2
      ),
      'utf8'
    );
  }
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
}

function writeStore(store) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

const server = http.createServer(async (request, response) => {
  if (!request.url) {
    sendJson(response, 404, { message: 'Not found' });
    return;
  }

  if (request.method === 'OPTIONS') {
    sendJson(response, 200, {});
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const store = readStore();

  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { status: 'ok', timestamp: new Date().toISOString() });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/projects') {
    sendJson(response, 200, store.projects);
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/projects') {
    const body = await parseBody(request);
    const project = {
      id: createId(),
      name: body.name || '',
      description: body.description || '',
      color: body.color || '#4b7bec'
    };
    store.projects.unshift(project);
    writeStore(store);
    sendJson(response, 201, project);
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/requirements') {
    sendJson(response, 200, store.requirements);
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/requirements') {
    const body = await parseBody(request);
    const requirement = {
      ...body,
      id: createId(),
      updatedAt: new Date().toISOString()
    };
    store.requirements.unshift(requirement);
    writeStore(store);
    sendJson(response, 201, requirement);
    return;
  }

  sendJson(response, 404, { message: 'Route not found' });
});

server.listen(PORT, () => {
  ensureStore();
  console.log(`Requirements Writer backend running on http://localhost:${PORT}`);
});
