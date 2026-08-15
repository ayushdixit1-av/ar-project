const fs = require('fs');
// This runs the app's preset logic
const presets = require('./dist/server.cjs'); 
// wait dist/server.cjs might not have presets exported.
