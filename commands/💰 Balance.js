/*CMD
  command: 💰 Balance
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

let balance = parseFloat(User.getProp("balance", 0));
let wallet = User.getProp("wallet", "Not set");
let refCount = parseInt(User.getProp("ref_count", 0));
let minWithdraw = parseFloat(Bot.getProp("min_withdraw", 0.5));

Bot.sendMessage(
  "💰 *Your Balance*\n\n" +
  "💵 Available: *$" + balance.toFixed(2) + " USDT*\n" +
  "👥 Total Referrals: *" + refCount + "*\n" +
  "👛 Wallet: `" + wallet + "`\n\n" +
  "📌 Min withdrawal: *$" + minWithdraw + " USDT*"
);
