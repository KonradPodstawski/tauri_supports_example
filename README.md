# Multi-Source Random Number Generator

A web application demonstrating random number generation using three different methods:
- SharedArrayBuffer for cross-thread communication
- WebGPU for GPU-accelerated computation
- WebAssembly (WASM) for native performance

## Features

- Real-time random number generation
- Separate endpoints for each source
- History tracking for generated numbers
- Visual representation of results
- Cross-origin isolation support

## Prerequisites

- Node.js
- Rust toolchain (for WASM compilation)
- Modern browser with WebGPU support

## Installation

1. Clone repository:
```bash
git clone https://github.com/KonradPodstawski/tauri_supports_example.git
cd tauri_supports_example
```

2. Install dependencies:
```bash
npm install
```

3. Compile WASM:
```bash
rustc --target wasm32-unknown-unknown -O --crate-type=cdylib src/random.rs -o public/random.wasm
```

4. Start server:
```bash
npm start
```

5. Access `http://localhost:3000`

## Project Structure

```
/project
├── /public
│   ├── index.html    # Redirect
│   ├── app.html      # Main application
│   ├── random.wasm   # Compiled WASM
│   └── styles.css
├── /src
│   └── random.rs     # WASM source
└── server.js         # Express server
```

## API Endpoints

- `/numbers/shared` - SharedArrayBuffer numbers
- `/numbers/webgpu` - WebGPU-generated numbers
- `/numbers/wasm` - WASM-generated numbers

Each endpoint supports:
- GET: Retrieve history
- POST: Submit new number

## Security

Server implements required headers for SharedArrayBuffer and cross-origin isolation:
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp
- Cross-Origin-Resource-Policy: cross-origin

## License

MIT
