# terminal-pomodoro

A beautiful terminal‐based Pomodoro timer with a purple gradient progress bar and desktop notifications. Stay focused and productive with this elegant command-line productivity tool.

## ✨ Features

- 🍅 **Classic Pomodoro Technique** - Work sessions followed by breaks
- 🌈 **Beautiful Purple Gradient Progress Bar** - Visual progress indicator
- 🔔 **Desktop Notifications** - Get notified when sessions complete
- ⚡ **Fast & Lightweight** - No GUI overhead, runs entirely in terminal
- 🎯 **Customizable Sessions** - Set your own work/break durations
- 🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux
- ⌨️ **Keyboard Friendly** - Stop anytime with Ctrl+C
- 📊 **Session Counter** - Track your progress through multiple sessions

## 🚀 Installation

```bash
npm install -g terminal-pomodoro
```

## 📖 Usage

### Interactive Mode (Default)
```bash
pomodoro
```
This will prompt you to enter:
- Work session duration (default: 25 minutes)
- Break duration (default: 5 minutes)  
- Number of sessions (default: 4)

### Command Line Arguments
```bash
pomodoro <worktime> <breaktime> <sessions>
```

### Examples

```bash
# Default Pomodoro (25min work, 5min break, 4 sessions)
pomodoro

# Custom session lengths
pomodoro 30 10 3

# Short bursts for intense focus
pomodoro 15 3 6

# Long coding sessions
pomodoro 50 15 2

# Study session
pomodoro 45 10 4
```

### Help
```bash
pomodoro --help
pomodoro -h
```

## 🎨 What It Looks Like

```
🍅 Pomodoro Timer

=== Session 1/4 ===
⏳ Working 👨‍💻
Started 2:30PM — 25m Work — Now 2:35PM
[████████████░░░░░░░░░░░░░░░░░░]  40%

✓ Work Complete!

⏰ Break time 😌
Started 2:55PM — 5m Break — Now 2:57PM
[██████████████░░░░░░░░░░░░░░░░]  47%
```

## ⚙️ Configuration

### Default Settings
- **Work Duration**: 25 minutes
- **Break Duration**: 5 minutes
- **Sessions**: 4
- **Progress Bar**: 30 characters with purple gradient

### Time Limits
- **Minimum**: 1 minute
- **Maximum Work/Break**: 300 minutes (5 hours)
- **Maximum Sessions**: 50

## 🔧 Requirements

- **Node.js**: Version 12 or higher
- **Terminal**: Any modern terminal with ANSI color support
- **Notifications**: Automatic desktop notifications (no setup required)

## 🐛 Troubleshooting

### "Pomodoro setup canceled"
This usually indicates a terminal compatibility issue:

1. **Try a different terminal**:
   - Windows: Use Command Prompt instead of PowerShell
   - macOS/Linux: Try Terminal.app or your default terminal
   - Avoid integrated terminals in IDEs when possible

2. **Check dependencies**:
   ```bash
   npm list -g inquirer node-notifier
   ```

3. **Reinstall if needed**:
   ```bash
   npm uninstall -g termdoro
   npm install -g termdoro
   ```

### Notifications not working
- **Windows**: Notifications should work automatically
- **macOS**: May require notification permissions
- **Linux**: Requires `libnotify` (`sudo apt-get install libnotify-bin` on Ubuntu)

### Progress bar not displaying correctly
- Ensure your terminal supports ANSI colors
- Try running in a standard terminal (not IDE integrated terminal)
- Windows users: Use Windows Terminal for best experience

## 🎯 Pomodoro Technique

The Pomodoro Technique is a time management method:

1. **Work** for 25 minutes (1 Pomodoro)
2. **Take a short break** for 5 minutes
3. **Repeat** 3 more times
4. **Take a longer break** (15-30 minutes) after 4 Pomodoros

### Benefits
- 🧠 **Improved focus** and concentration
- 📈 **Better time estimation** skills
- 💪 **Reduced mental fatigue**
- 🎯 **Enhanced productivity**
- ⚖️ **Better work-life balance**

## 🚫 Stopping the Timer

Press `Ctrl+C` at any time to gracefully stop the timer.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
```bash
git clone https://github.com/yourusername/terminal-pomodoro
cd terminal-pomodoro
npm install
```

### Running Locally
```bash
node index.js
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique created by Francesco Cirillo
- Built with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for interactive prompts
- Desktop notifications powered by [node-notifier](https://github.com/mikaelbr/node-notifier)

## 📈 Version History

### v1.0.0
- Initial release
- Interactive prompts
- Purple gradient progress bar
- Desktop notifications
- Cross-platform support

---

**Happy focusing! 🍅✨**

*Made with ❤️ for productivity enthusiasts*