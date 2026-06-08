/*CMD
  command: /admin_genpromo
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
User.setProp("waiting_genpromo", "1");
Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "🎁 *Generate Promo Codes*\n\n" +
  "Send in format:\n`COUNT AMOUNT MAX_USES`\n\n" +
  "Example: `10 0.5 1`"
);
