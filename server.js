const express = require('express');
const app = express();
const path = require('path');

// Store for random numbers
const numbers = {
    shared: [],
    webgpu: [],
    wasm: []
};

app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SharedArrayBuffer endpoints
app.post('/numbers/shared', (req, res) => {
    const { value } = req.body;
    numbers.shared.push({
        value,
        timestamp: new Date()
    });
    if (numbers.shared.length > 100) {
        numbers.shared.shift();
    }
    res.sendStatus(200);
});

app.get('/numbers/shared', (req, res) => {
    res.json(numbers.shared);
});

// WebGPU endpoints
app.post('/numbers/webgpu', (req, res) => {
    const { value } = req.body;
    numbers.webgpu.push({
        value,
        timestamp: new Date()
    });
    if (numbers.webgpu.length > 100) {
        numbers.webgpu.shift();
    }
    res.sendStatus(200);
});

app.get('/numbers/webgpu', (req, res) => {
    res.json(numbers.webgpu);
});

// WASM endpoints
app.post('/numbers/wasm', (req, res) => {
    const { value } = req.body;
    numbers.wasm.push({
        value,
        timestamp: new Date()
    });
    if (numbers.wasm.length > 100) {
        numbers.wasm.shift();
    }
    res.sendStatus(200);
});

app.get('/numbers/wasm', (req, res) => {
    res.json(numbers.wasm);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('CORS headers enabled for SharedArrayBuffer support');
});