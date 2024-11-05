const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "commandLogs.txt");

const logCommandUsage = (user, commandName) => {
  const logMessage = `${new Date().toISOString()} - User: ${
    user.tag
  } executed command: ${commandName}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

module.exports = { logCommandUsage };
