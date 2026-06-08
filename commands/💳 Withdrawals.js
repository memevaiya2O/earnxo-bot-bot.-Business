/*CMD
  command: 💳 Withdrawals
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
    "💳 *Withdrawal Management*\n\n" +
    "To approve: `/approve_REQID`\n" +
    "To reject: `/reject_REQID`\n\n" +
    "Pending count: *" + Bot.getProp("pending_count", 0) + "*"
  );
  return;
}
