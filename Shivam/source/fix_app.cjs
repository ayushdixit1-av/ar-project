const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexInsert = /(<div className="w-screen h-screen[^>]*>\s*)\{\/\* Main View Container \*\/\}/;
const newInsert = `$1<HeaderNav
        activeView={activeView}
        setActiveView={setActiveView}
        simState={simState}
        setSimState={setSimState}
        placedCount={placedComponents.length - 2}
        wireCount={wires.length}
        onOpenDocs={() => setIsArchitectureOpen(true)}
        onOpenMobileSync={() => setIsMobileSyncOpen(true)}
        onOpenActiveItemsMenu={() => setIsActiveItemsMenuOpen(true)}
        presets={CIRCUIT_PRESETS}
        onLoadPreset={handleLoadPreset}
      />
      {/* Main View Container */}`;

code = code.replace(regexInsert, newInsert);
fs.writeFileSync('src/App.tsx', code);
