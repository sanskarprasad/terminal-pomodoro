#!/usr/bin/env node

// Simple Pomodoro Timer with command line arguments
// Usage: node pomodoro.js [work_minutes] [break_minutes] [sessions]
// Example: node pomodoro.js 25 5 4

const notifier = require('node-notifier');

const COLORS = {
  RESET: '\x1b[0m',
  CYAN: '\x1b[36m',
  YELLOW: '\x1b[33m',
  GREEN: '\x1b[32m'
};

function showUsage() {
  console.log(`
🍅 Pomodoro Timer

Usage: node ${process.argv[1].split(/[\\/]/).pop()} [work_minutes] [break_minutes] [sessions]

Examples:
  node pomodoro.js 25 5 4    # 25min work, 5min break, 4 sessions
  node pomodoro.js 50 10 2   # 50min work, 10min break, 2 sessions
  node pomodoro.js           # Default: 25min work, 5min break, 4 sessions
`);
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const minute = m.toString().padStart(2, '0');
  return `${hour}:${minute}${ampm}`;
}

function runTimer(totalSeconds, label, minutes) {
  return new Promise((resolve) => {
    let remaining = totalSeconds;
    const startTime = new Date();
    
    console.log(`\n⏳ ${label} session started (${minutes} minutes)`);
    console.log(`Started at: ${formatTime(startTime)}`);
    
    const interval = setInterval(() => {
      const elapsed = totalSeconds - remaining;
      const progress = Math.round((elapsed / totalSeconds) * 100);
      const remainingMin = Math.ceil(remaining / 60);
      
      // Simple progress indicator
      const bars = Math.floor(progress / 5);
      const progressBar = '█'.repeat(bars) + '░'.repeat(20 - bars);
      
      process.stdout.write(`\r[${progressBar}] ${progress}% - ${remainingMin}m remaining`);
      
      if (--remaining < 0) {
        clearInterval(interval);
        console.log(`\n${COLORS.GREEN}✓ ${label} Complete!${COLORS.RESET}`);
        
        try {
          notifier.notify({
            title: 'Pomodoro 🍅',
            message: `${label} finished!`,
            sound: true
          });
        } catch (e) {
          console.log('🔔 Time\'s up!');
        }
        
        setTimeout(resolve, 1000); // Brief pause between sessions
      }
    }, 1000);
  });
}

async function main() {
  // Parse command line arguments or use defaults
  let workMinutes = 25;
  let breakMinutes = 5;
  let sessions = 4;
  
  const args = process.argv.slice(2);
  
  if (args.includes('-h') || args.includes('--help')) {
    showUsage();
    return;
  }
  
  if (args.length >= 1) {
    workMinutes = parseInt(args[0]);
    if (isNaN(workMinutes) || workMinutes <= 0) {
      console.error('❌ Invalid work minutes');
      showUsage();
      return;
    }
  }
  
  if (args.length >= 2) {
    breakMinutes = parseInt(args[1]);
    if (isNaN(breakMinutes) || breakMinutes <= 0) {
      console.error('❌ Invalid break minutes');
      showUsage();
      return;
    }
  }
  
  if (args.length >= 3) {
    sessions = parseInt(args[2]);
    if (isNaN(sessions) || sessions <= 0) {
      console.error('❌ Invalid session count');
      showUsage();
      return;
    }
  }
  
  console.log(`${COLORS.CYAN}🍅 Pomodoro Timer Starting${COLORS.RESET}`);
  console.log(`Work: ${workMinutes}min | Break: ${breakMinutes}min | Sessions: ${sessions}`);
  console.log(`Press Ctrl+C to stop at any time\n`);
  
  const workSeconds = workMinutes * 60;
  const breakSeconds = breakMinutes * 60;
  
  try {
    for (let i = 1; i <= sessions; i++) {
      console.log(`${COLORS.CYAN}=== Session ${i}/${sessions} ===${COLORS.RESET}`);
      
      await runTimer(workSeconds, 'Work', workMinutes);
      
      if (i < sessions) {
        await runTimer(breakSeconds, 'Break', breakMinutes);
      }
    }
    
    console.log(`\n${COLORS.CYAN}🎉 All ${sessions} sessions completed! Great work!${COLORS.RESET}`);
    
  } catch (error) {
    console.log('\n⏹️  Timer stopped');
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Pomodoro timer stopped. Have a great day!');
  process.exit(0);
});

main();