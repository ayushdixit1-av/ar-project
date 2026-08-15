const fs = require('fs');
let code = fs.readFileSync('src/components/HeaderNav.tsx', 'utf8');

const regexProps = /export interface HeaderNavProps \{[\s\S]*?\}/;
const newProps = `import { CircuitPreset } from '../data/presets';

export interface HeaderNavProps {
  activeView: AppViewMode;
  setActiveView: (view: AppViewMode) => void;
  simState: SimulationState;
  setSimState: React.Dispatch<React.SetStateAction<SimulationState>>;
  placedCount: number;
  wireCount: number;
  onOpenDocs?: () => void;
  onOpenMobileSync?: () => void;
  onOpenActiveItemsMenu?: () => void;
  presets?: CircuitPreset[];
  onLoadPreset?: (presetId: string) => void;
}`;
code = code.replace(regexProps, newProps);

const regexParams = /onOpenActiveItemsMenu,\n\}\) => \{/;
const newParams = `onOpenActiveItemsMenu,
  presets,
  onLoadPreset,
}) => {`;
code = code.replace(regexParams, newParams);

// Add dropdown button next to the power button
const regexPowerDiv = /\{\/\* Power Toggle Switch \*\/\}/;
const newPowerDiv = `{/* Presets Dropdown */}
        {presets && onLoadPreset && (
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 text-xs font-mono font-bold transition-all shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Load Preset</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="py-2">
                <div className="px-3 pb-2 text-xs font-bold text-slate-400 border-b border-slate-700/50 mb-1 uppercase tracking-wider">Preset Circuits</div>
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onLoadPreset(p.id)}
                    className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-indigo-600/40 transition-colors hover:text-white"
                  >
                    <div className="font-bold">{p.name}</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Power Toggle Switch */}`;
code = code.replace(regexPowerDiv, newPowerDiv);

fs.writeFileSync('src/components/HeaderNav.tsx', code);
