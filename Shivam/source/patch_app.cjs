const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexImports = /import \{ HeaderNav \} from '\.\/components\/HeaderNav';/;
const newImports = `import { HeaderNav } from './components/HeaderNav';
import { CIRCUIT_PRESETS } from './data/presets';`;
code = code.replace(regexImports, newImports);

const regexToggleInput = /const handleToggleInputIndex = \(index: number\) => \{/;
const newToggleInput = `const handleLoadPreset = (presetId: string) => {
    const preset = CIRCUIT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setPlacedComponents(preset.components);
    setWires(preset.wires.map((w: any) => ({ ...w, isEnergized: false, logicState: 0, voltage: 0 })));
    setSimState(prev => ({
      ...prev,
      inputs: [...preset.inputs],
      switchAOn: preset.inputs[0],
      switchBOn: preset.inputs[1],
      isPowered: false,
    }));
    audioSynth.playSwitchClick(true);
    setSelectedComponent(null);
  };

  const handleToggleInputIndex = (index: number) => {`;
code = code.replace(regexToggleInput, newToggleInput);

const regexHeaderNav = /<HeaderNav\s+activeView=\{activeView\}\s+setActiveView=\{setActiveView\}\s+simState=\{simState\}\s+setSimState=\{setSimState\}\s+placedCount=\{placedComponents\.length - 2\}\s+wireCount=\{wires\.length\}\s+onOpenDocs=\{[^\}]*\}\s+onOpenMobileSync=\{[^\}]*\}\s+onOpenActiveItemsMenu=\{[^\}]*\}/;

const newHeaderNav = `<HeaderNav
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
      `;
code = code.replace(regexHeaderNav, newHeaderNav);

// Try replacing it more robustly if it failed
const replaceAlternative = (str, regex, replacement) => {
  if (regex.test(str)) {
    return str.replace(regex, replacement);
  }
  // Try another approach
  const regexHeaderNavAlt = /<HeaderNav[\s\S]*?onOpenActiveItemsMenu=\{[^\}]*\}/;
  return str.replace(regexHeaderNavAlt, newHeaderNav);
};

code = replaceAlternative(code, regexHeaderNav, newHeaderNav);

fs.writeFileSync('src/App.tsx', code);
