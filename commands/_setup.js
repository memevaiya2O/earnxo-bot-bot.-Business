/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (String(user.telegramid) !== "8373846582") {
  Bot.sendMessage("⛔ Access Denied.");
  return;
}

// Core Settings
Bot.setProp("admin_chat_id", "8373846582");
Bot.setProp("min_withdraw", 0.5, "float");
Bot.setProp("ref_bonus", 0.1, "float");
Bot.setProp("ref_target", 3, "integer");
Bot.setProp("channel_link", "https://t.me/nxt_coder");
Bot.setProp("channel_name", "NxT Coder");
Bot.setProp("total_users", 0, "integer");
Bot.setProp("total_paid", 0, "float");
Bot.setProp("pending_count", 0, "integer");
Bot.setProp("prizes", JSON.stringify(["$5", "$3", "$1"]));
Bot.setProp("broadcast_msg", "");

Bot.sendMessage(
  "✅ *Bot Setup Complete!*\n\n" +
  "⚙️ Default Settings:\n\n" +
  "• Admin ID: `8373846582`\n" +
  "• Min Withdraw: *$0.50 USDT*\n" +
  "• Ref Bonus: *$0.10 USDT*\n" +
  "• Ref Target: *3 friends*\n" +
  "• Channel: *https://t.me/nxt_coder*\n\n" +
  "🚀 Bot is ready! Use /admin to open Admin Panel."
);
