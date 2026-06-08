/*CMD
  command: /admin_withdrawals
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

let pendingCount = parseInt(Bot.getProp("pending_count", 0));

Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "💳 *Withdrawal Management*\n\n" +
  "⏳ Pending: *" + pendingCount + "*\n\n" +
  "To approve:\n`/approve WD123456_1234567890`\n\n" +
  "To reject:\n`/reject WD123456_1234567890`\n\n" +
  "📌 Request IDs are sent automatically when users request withdrawal."
);
