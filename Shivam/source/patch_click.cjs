const fs = require('fs');
let code = fs.readFileSync('src/components/Trainer3DViewport.tsx', 'utf8');

const regexClock = /\/\/ 3\. Check if pin clicked/;
const newClock = `// Clock Button
      if (hitObj.name === 'clock-pulse-btn') {
        if (props.onToggleClock) props.onToggleClock();
        return;
      }
      
      // 3. Check if pin clicked`;
code = code.replace(regexClock, newClock);

fs.writeFileSync('src/components/Trainer3DViewport.tsx', code);
