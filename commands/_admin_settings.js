/*CMD
  command: /admin_settings
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

if (String(user.telegramid) !== "8373846582") { return; }

User.setProp("waiting_admin_settings", "1");

Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "⚙️ *Settings*\n\n" +
  "Current values:\n\n" +
  "• Min Withdraw: *$" + Bot.getProp("min_withdraw", 0.5) + "*\n" +
  "• Ref Bonus: *$" + Bot.getProp("ref_bonus", 0.1) + "*\n" +
  "• Ref Target: *" + Bot.getProp("ref_target", 3) + "*\n" +
  "• Channel Link: *" + Bot.getProp("channel_link", "https://t.me/nxt_coder") + "*\n" +
  "• Channel Name: *" + Bot.getProp("channel_name", "NxT Coder") + "*\n\n" +
  "📝 Now send to update:\n\n" +
  "`min_withdraw 0.3`\n" +
  "`ref_bonus 0.15`\n" +
  "`ref_target 5`\n" +
  "`channel_link https://t.me/yourchannel`\n" +
  "`channel_name Your Channel Name`"
);
