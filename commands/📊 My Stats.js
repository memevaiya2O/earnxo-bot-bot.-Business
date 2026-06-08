/*CMD
  command: 📊 My Stats
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

let res = Libs.ResourcesLib.userRes("balance");
let refCount = User.getProp("ref_count", 0);
let totalEarned = User.getProp("total_earned", 0);
let totalWithdrawn = User.getProp("total_withdrawn", 0);
let wallet = User.getProp("wallet", "Not set");
let joinedAt = User.getProp("joined_at", Date.now());
let date = new Date(joinedAt).toDateString();

Bot.sendMessage(
  "📊 *My Statistics*\n\n" +
  "👤 Name: *" + user.first_name + "*\n" +
  "🆔 Telegram ID: `" + user.telegramid + "`\n" +
  "📅 Joined: *" + date + "*\n\n" +
  "💰 Current Balance: *$" + res.value().toFixed(2) + " USDT*\n" +
  "📈 Total Earned: *$" + parseFloat(totalEarned).toFixed(2) + " USDT*\n" +
  "💸 Total Withdrawn: *$" + parseFloat(totalWithdrawn).toFixed(2) + " USDT*\n\n" +
  "👥 Referrals: *" + refCount + "*\n" +
  "👛 Wallet: `" + wallet + "`"
);
