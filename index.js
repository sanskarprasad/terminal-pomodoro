#!/usr/bin/env node

const inquirerModule = require('inquirer');
const inquirer = inquirerModule.default || inquirerModule;
const notifier = require('node-notifier');

// ANSI escape codes
const RESET  = '\x1b[0m';
const CYAN   = '\x1b[36m';
const YELLOW = '\x1b[33m';

// Width of the bar in characters
const BAR_LENGTH = 30;

async function main() {
  let workMinutes, breakMinutes, sessions;
  try {
    // 1) Ask for work duration in minutes
    ({ workMinutes } = await inquirer.prompt([{
      type: 'input',
      name: 'workMinutes',
      message: 'Enter Pomodoro (work) duration in minutes:',
      validate(val) {
        const n = Number(val);
        return (!isNaN(n) && n > 0) ? true : 'Please enter a positive number';
      }
    }]));

    // 2) Ask for break duration in minutes
    ({ breakMinutes } = await inquirer.prompt([{
      type: 'input',
      name: 'breakMinutes',
      message: 'Enter Break duration in minutes:',
      validate(val) {
        const n = Number(val);
        return (!isNaN(n) && n > 0) ? true : 'Please enter a positive number';
      }
    }]));

    // 3) Ask for number of sessions
    ({ sessions } = await inquirer.prompt([{
      type: 'input',
      name: 'sessions',
      message: 'Enter number of Pomodoro sessions:',
      validate(val) {
        const n = Number(val);
        return (!isNaN(n) && n > 0 && Number.isInteger(Number(val)))
          ? true
          : 'Please enter a positive integer';
      }
    }]));
  } catch (err) {
    // User hit Ctrl+C during a prompt
    process.stdout.write('\nPomodoro setup canceled.\n');
    process.exit(0);
  }

  const workSeconds  = Number(workMinutes) * 60;
  const breakSeconds = Number(breakMinutes) * 60;
  const sessionCount = Number(sessions);

  await runFullCycles(sessionCount, workSeconds, breakSeconds, workMinutes, breakMinutes);
  process.stdout.write(`\n${CYAN}All ${sessionCount} session${sessionCount > 1 ? 's' : ''} complete! 🎉${RESET}\n\n`);
}

async function runFullCycles(count, workSec, breakSec, workMin, breakMin) {
  for (let i = 1; i <= count; i++) {
    process.stdout.write(`\n${CYAN}=== Session ${i} of ${count} ===${RESET}\n`);
    await runTimer(workSec, 'Work', workMin);
    if (i < count) {
      await runTimer(breakSec, 'Break', breakMin);
    }
  }
}


function runTimer(totalSeconds, label, minutes) {
  return new Promise((resolve) => {
    let remaining = totalSeconds;
    const startTime = new Date();

    // Format “HH:MM AM/PM”
    function formatHourMinute(d) {
      let h = d.getHours();
      const m = d.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 === 0 ? 12 : h % 12;
      const mm = String(m).padStart(2, '0');
      return `${h}:${mm}${ampm}`;
    }

    // Decide top label
    const startLabel = label === 'Work'
      ? '⏳ We are working 👨‍💻'
      : '⏰ Break time 😌';

    // ——— Print Header Line 1 (once) ———
    process.stdout.write(`${startLabel}\n`);

    // ——— Print Header Line 2 (once) ———
    const startHM      = formatHourMinute(startTime);
    const durationText = `${minutes}m ${label}`;
    // Initially “Now” equals the start time (we’ll overwrite “Now …” every tick)
    process.stdout.write(`Started at ${startHM} — Duration ${durationText} — Now ${startHM}\n`);

    // ——— Print Bar Line 3 (once, at 0%) ———
    const emptyBar = '░'.repeat(BAR_LENGTH);
    process.stdout.write(`[${emptyBar}]  0%\n`);

    // Now we set up our interval to update only Lines 2 & 3 each tick:
    const interval = setInterval(() => {
      const now     = new Date();
      const elapsed = totalSeconds - remaining;
      const percent = Math.min(1, elapsed / totalSeconds);
      const filled  = Math.floor(percent * BAR_LENGTH);

      // 1) Move UP **two lines** (from after Bar Line 3 back to Header Line 2)
      process.stdout.write('\x1b[2A');

      // 2) Overwrite Header Line 2: “Started at … — Duration … — Now HH:MM AM/PM”
      const nowHM = formatHourMinute(now);
      process.stdout.write(`Started at ${startHM} — Duration ${durationText} — Now ${nowHM}\n`);

      // 3) Rebuild the purple→dark-purple gradient bar + percentage, then overwrite Line 3
      let bar = '';
      for (let j = 0; j < BAR_LENGTH; j++) {
        if (j < filled) {
          // Interpolate t from 0→1 for purple gradient
          const t = j / (BAR_LENGTH - 1);
          // Purple1 = (200, 0, 255), Purple2 = (100, 0, 150)
          const r = Math.round(200 * (1 - t) + 100 * t);
          const g = 0;
          const b = Math.round(255 * (1 - t) + 150 * t);
          bar += `\x1b[38;2;${r};${g};${b}m█`;
        } else {
          bar += '░';
        }
      }
      bar += RESET;

      const pctNum = Math.round(percent * 100);
      const pctStr = `${pctNum < 10 ? ' ' : ''}${pctNum}%`;
      process.stdout.write(`[${bar}]  ${pctStr}\n`);

      remaining--;
      if (remaining < 0) {
        clearInterval(interval);
        process.stdout.write(`\n${YELLOW}*** ${label} ⏰ Finished! ***${RESET}\n`);
        notifier.notify({
          title: `Pomodoro 🍅`,
          message: `${label} time is up!`,
          sound: true,
          wait: false
        });
        resolve();
      }
    }, 1000);
  });
}


main();
