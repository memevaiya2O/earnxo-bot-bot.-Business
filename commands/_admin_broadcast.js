/*CMD
  command: /admin_broadcast
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
User.setProp("waiting_broadcast", "1");
Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "📣 *Broadcast*\n\nSend the message to broadcast to ALL users 👇"
);
