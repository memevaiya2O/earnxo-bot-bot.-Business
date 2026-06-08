/*CMD
  command: ⚙️ Settings
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let adminId = Bot.getProp("admin_chat_id");
if (String(user.telegramid) !== String(adminId)) { return; }

if (!message) {
  Bot.sendMessage(
    "⚙️ *Settings*\n\n" +
    "Current values:\n" +
    "• Min Withdraw: $" + Bot.getProp("min_withdraw", 0.5) + "\n" +
    "• Ref Bonus: $" + Bot.getProp("ref_bonus", 0.1) + "\n" +
    "• Ref Target: " + Bot.getProp("ref_target", 3) + "\n" +
    "• Channel ID: " + Bot.getProp("channel_id", "not set") + "\n\n" +
    "Send setting to change:\n" +
    "`min_withdraw 0.3`\n" +
    "`ref_bonus 0.15`\n" +
    "`ref_target 5`\n" +
    "`channel_id -1001234567`"
  );
  return;
}

let parts = message.trim().split(" ");
let key = parts[0];
let val = parts[1];
let allowed = ["min_withdraw", "ref_bonus", "ref_target", "channel_id", "channel_link", "admin_chat_id"];

if (!allowed.includes(key) || !val) {
  Bot.sendMessage("❌ Invalid setting. Use format: `key value`");
  return;
}

Bot.setProp(key, val);
Bot.sendMessage("✅ Updated: *" + key + "* = `" + val + "`");
