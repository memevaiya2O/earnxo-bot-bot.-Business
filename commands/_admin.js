/*CMD
  command: /admin
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

let totalUsers = parseInt(Bot.getProp("total_users", 0));
let totalPaid = parseFloat(Bot.getProp("total_paid", 0));
let pendingCount = parseInt(Bot.getProp("pending_count", 0));
let minWithdraw = parseFloat(Bot.getProp("min_withdraw", 0.5));
let refBonus = parseFloat(Bot.getProp("ref_bonus", 0.1));
let refTarget = parseInt(Bot.getProp("ref_target", 3));
let channelLink = Bot.getProp("channel_link", "https://t.me/nxt_coder");

Bot.sendInlineKeyboard([
  { title: "📊 Stats", command: "/admin_stats" },
  { title: "⚙️ Settings", command: "/admin_settings" },
  { title: "🎁 Gen Promos", command: "/admin_genpromo" },
  { title: "💳 Withdrawals", command: "/admin_withdrawals" },
  { title: "👥 User Lookup", command: "/admin_userlookup" },
  { title: "📣 Broadcast", command: "/admin_broadcast" }
],
  "⚙️ *Admin Panel*\n\n" +
  "👥 Total Users: *" + totalUsers + "*\n" +
  "💸 Total Paid: *$" + totalPaid.toFixed(2) + " USDT*\n" +
  "⏳ Pending Withdrawals: *" + pendingCount + "*\n\n" +
  "⚙️ Min Withdraw: *$" + minWithdraw + "*\n" +
  "💰 Ref Bonus: *$" + refBonus + "*\n" +
  "🎯 Ref Target: *" + refTarget + "*\n" +
  "📢 Channel: " + channelLink
);
