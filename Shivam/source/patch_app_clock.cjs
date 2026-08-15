const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add autoClock toggle to useEffect
const clockEffect = `
  // 1Hz Clock Generator
  useEffect(() => {
    if (!simState.isPowered) return;
    const interval = setInterval(() => {
      setSimState(prev => ({
        ...prev,
        autoClockPulse: !prev.autoClockPulse
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [simState.isPowered]);

  // Main simulation engine step...
`;

code = code.replace(/\/\/ Main simulation engine step.../, clockEffect);

// Wait, I need to make sure autoClockPulse is in SimulationState
fs.writeFileSync('src/App.tsx', code);
