/*CMD
  command: 📊 Stats
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

let adminId = Bot.getProp("admin_chat_id");
if (String(user.telegramid) !== String(adminId)) { return; }

let totalUsers = Bot.getProp("total_users", 0);
let totalPaid = Bot.getProp("total_paid", 0);
let pendingCount = Bot.getProp("pending_count", 0);

Bot.sendMessage(
  "📊 *Bot Dashboard*\n\n" +
  "👥 Total Users: *" + totalUsers + "*\n" +
  "💸 Total Paid Out: *$" + parseFloat(totalPaid).toFixed(2) + " USDT*\n" +
  "⏳ Pending Withdrawals: *" + pendingCount + "*\n\n" +
  "⚙️ Min Withdraw: *$" + Bot.getProp("min_withdraw", 0.5) + "*\n" +
  "💰 Ref Bonus: *$" + Bot.getProp("ref_bonus", 0.1) + "*\n" +
  "🎯 Ref Target: *" + Bot.getProp("ref_target", 3) + "*"
);
