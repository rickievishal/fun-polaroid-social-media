const colors = {
  info: "\x1b[36m",   // cyan
  warn: "\x1b[33m",   // yellow
  error: "\x1b[31m",  // red
  reset: "\x1b[0m"
};

const log = {
  info: (component, message) =>
    console.log(`${colors.info}[INFO] [${component}] ${message}${colors.reset}`),

  warn: (component, message) =>
    console.warn(`${colors.warn}[WARN] [${component}] ${message}${colors.reset}`),

  error: (component, message) =>
    console.error(`${colors.error}[ERROR] [${component}] ${message}${colors.reset}`)
};
module.exports = {log}