/*CMD
  command: /promo_input
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

if (!message || message == "🎫 Promo Code") {
  Bot.sendMessage("🎫 Please type your promo code:");
  return;
}

let code = message.trim().toUpperCase();
let promoRaw = Bot.getProp("promo_" + code);

if (!promoRaw) {
  Bot.sendMessage("❌ Invalid promo code. Try again.");
  return;
}

let promo = JSON.parse(promoRaw);

if (!promo.active) {
  Bot.sendMessage("⛔ This code is expired.");
  return;
}

let usedKey = "used_" + code + "_" + user.telegramid;
if (Bot.getProp(usedKey)) {
  Bot.sendMessage("⚠️ You already used this code.");
  return;
}

if (promo.uses >= promo.max_uses) {
  Bot.sendMessage("⛔ Code limit reached.");
  return;
}

let balance = parseFloat(User.getProp("balance", 0));
let newBalance = balance + promo.value;
User.setProp("balance", newBalance, "float");

let totalEarned = parseFloat(User.getProp("total_earned", 0));
User.setProp("total_earned", totalEarned + promo.value, "float");

promo.uses += 1;
if (promo.uses >= promo.max_uses) promo.active = false;
Bot.setProp("promo_" + code, JSON.stringify(promo));
Bot.setProp(usedKey, "1");

Bot.sendMessage(
  "✅ *Code Activated!*\n\n" +
  "🎁 Code: `" + code + "`\n" +
  "💰 Added: *$" + promo.value.toFixed(2) + " USDT*\n" +
  "💵 New Balance: *$" + newBalance.toFixed(2) + " USDT*"
);
