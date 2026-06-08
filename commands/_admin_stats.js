/*CMD
  command: /admin_stats
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

let totalUsers = parseInt(Bot.getProp("total_users", 0));
let totalPaid = parseFloat(Bot.getProp("total_paid", 0));
let pendingCount = parseInt(Bot.getProp("pending_count", 0));

Bot.sendInlineKeyboard([
  { title: "🔙 Back to Admin", command: "/admin" }
],
  "📊 *Bot Statistics*\n\n" +
  "👥 Total Users: *" + totalUsers + "*\n" +
  "💸 Total Paid Out: *$" + totalPaid.toFixed(2) + " USDT*\n" +
  "⏳ Pending Withdrawals: *" + pendingCount + "*\n\n" +
  "⚙️ Min Withdraw: *$" + Bot.getProp("min_withdraw", 0.5) + " USDT*\n" +
  "💰 Ref Bonus: *$" + Bot.getProp("ref_bonus", 0.1) + " USDT*\n" +
  "🎯 Ref Target: *" + Bot.getProp("ref_target", 3) + " friends*\n" +
  "📢 Channel: " + Bot.getProp("channel_link", "https://t.me/nxt_coder")
);
