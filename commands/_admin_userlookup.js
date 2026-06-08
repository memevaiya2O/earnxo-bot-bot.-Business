/*CMD
  command: /admin_userlookup
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
User.setProp("waiting_lookup", "1");
Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "👥 *User Lookup*\n\nSend the user's Telegram ID 👇"
);
