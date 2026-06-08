/*CMD
  command: 💸 Withdraw
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

let wallet = User.getProp("wallet", "");

if (!wallet) {
  Bot.sendInlineKeyboard(
    [
      [{ title: "👛 Set Wallet", command: "set_wallet" }],
      [{ title: "🔙 Back", command: "back" }]
    ],
    "💸 *Withdraw*\n\n" +
    "⚠️ *No wallet set yet!*\n\n" +
    "Please set your *BEP-20 wallet* first 👇"
  );
  return;
}

let balance = parseFloat(User.getProp("balance", 0));
let minWithdraw = parseFloat(Bot.getProp("min_withdraw", 0.5));

Bot.sendInlineKeyboard(
  [
    [{ title: "💸 Withdraw", command: "do_withdraw" }],
    [{ title: "🔄 Change Wallet", command: "change_wallet" }],
    [{ title: "🗑 Delete Wallet", command: "delete_wallet" }]
  ],
  "💸 *Withdraw*\n\n" +
  "💵 Balance: *$" + balance.toFixed(2) + " USDT*\n" +
  "👛 Wallet: `" + wallet + "`\n" +
  "📌 Min Withdraw: *$" + minWithdraw + " USDT*"
);
