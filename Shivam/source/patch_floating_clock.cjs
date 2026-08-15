const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexMap = /\{\/\* Power Toggle Switch \*\/\}/;
const newMap = `{/* Clock Pulse */}
                <button
                  onMouseDown={handleToggleClock}
                  className={\`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-bold transition-all border shrink-0 text-[10px] sm:text-xs \${
                    simState.button1Pressed
                      ? 'bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      : 'bg-slate-800 text-red-400 border-red-900/50 hover:bg-slate-700'
                  }\`}
                >
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  CLOCK PULSE
                </button>
                <div className="w-px h-6 bg-slate-700 mx-0.5 sm:mx-1 shrink-0"></div>

                {/* Power Toggle Switch */}`;
code = code.replace(regexMap, newMap);
fs.writeFileSync('src/App.tsx', code);
