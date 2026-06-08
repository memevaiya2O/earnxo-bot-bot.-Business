/*CMD
  command: 👛 Set Wallet
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

if (!message) {
  Bot.sendMessage("👛 *Enter your BEP-20 (BSC) wallet address:*");
  return;
}

let wallet = message.trim();
if (!wallet.startsWith("0x") || wallet.length !== 42) {
  Bot.sendMessage("❌ Invalid BEP-20 address!\n\nMust start with `0x` and be 42 characters.\n\nTry again 👇");
  return;
}

User.setProp("wallet", wallet);
Bot.sendMessage(
  "✅ *Wallet Saved!*\n\n" +
  "👛 Address: `" + wallet + "`\n\n" +
  "You can now request withdrawals 💸"
);
