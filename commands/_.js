/*CMD
  command: *
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

const ADMIN_ID = "8373846582";

let waitingPromo = User.getProp("waiting_promo", "0");
let waitingWallet = User.getProp("waiting_wallet", "0");
let waitingWithdraw = User.getProp("waiting_withdraw", "0");
let waitingSettings = User.getProp("waiting_admin_settings", "0");
let waitingBroadcast = User.getProp("waiting_broadcast", "0");
let waitingLookup = User.getProp("waiting_lookup", "0");
let waitingGenPromo = User.getProp("waiting_genpromo", "0");

let isAdmin = String(user.telegramid) === ADMIN_ID;
let text = message ? message.trim() : "";

if (waitingPromo === "1") {

  User.setProp("waiting_promo", "0");

  let code = text.toUpperCase();
  let promoRaw = Bot.getProp("promo_" + code);

  if (!promoRaw) {
    Bot.sendMessage("❌ Invalid promo code.");
    return;
  }

  let promo = JSON.parse(promoRaw);

  if (!promo.active) {
    Bot.sendMessage("⛔ This promo code has expired.");
    return;
  }

  let usedKey = "used_" + code + "_" + user.telegramid;

  if (Bot.getProp(usedKey)) {
    Bot.sendMessage("⚠️ You already used this code.");
    return;
  }

  if (promo.uses >= promo.max_uses) {
    Bot.sendMessage("⛔ Promo limit reached.");
    return;
  }

  let balance = parseFloat(User.getProp("balance", 0));
  let newBalance = balance + promo.value;

  User.setProp("balance", newBalance, "float");
  User.setProp(
    "total_earned",
    parseFloat(User.getProp("total_earned", 0)) + promo.value,
    "float"
  );

  promo.uses++;

  if (promo.uses >= promo.max_uses) {
    promo.active = false;
  }

  Bot.setProp("promo_" + code, JSON.stringify(promo));
  Bot.setProp(usedKey, "1");

  Bot.sendMessage(
    "✅ Code Activated!\n\n" +
    "💰 Reward: $" + promo.value.toFixed(2) + " USDT\n" +
    "💵 Balance: $" + newBalance.toFixed(2) + " USDT"
  );

  return;

} else if (waitingWallet === "set" || waitingWallet === "change") {

  let wallet = text;

  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    Bot.sendMessage(
      "❌ Invalid BEP20 wallet address.\n\nExample:\n0x1234567890abcdef1234567890abcdef12345678"
    );
    return;
  }

  User.setProp("wallet", wallet);
  User.setProp("waiting_wallet", "0");

  Bot.sendInlineKeyboard(
    [
      [
        { title: "🔄 Change Wallet", command: "/change_wallet" }
      ],
      [
        { title: "🗑 Delete Wallet", command: "/delete_wallet" }
      ]
    ],
    "✅ Wallet Saved!\n\n👛 " + wallet
  );

  return;

} else if (waitingWithdraw === "1") {

  User.setProp("waiting_withdraw", "0");

  let amount = parseFloat(text);
  let balance = parseFloat(User.getProp("balance", 0));
  let minWithdraw = parseFloat(Bot.getProp("min_withdraw", 0.5));
  let wallet = User.getProp("wallet", "");
  let pending = parseFloat(User.getProp("pending_withdraw", 0));

  if (!wallet) {
    Bot.sendMessage("❌ Please set a wallet first.");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    Bot.sendMessage("❌ Invalid amount.");
    return;
  }

  if (amount < minWithdraw) {
    Bot.sendMessage("❌ Minimum withdrawal is $" + minWithdraw + " USDT");
    return;
  }

  if (amount > balance) {
    Bot.sendMessage(
      "❌ Insufficient balance.\n\nBalance: $" +
      balance.toFixed(2) +
      " USDT"
    );
    return;
  }

  if (pending > 0) {
    Bot.sendMessage("⏳ You already have a pending withdrawal.");
    return;
  }

  let newBalance = balance - amount;

  User.setProp("balance", newBalance, "float");
  User.setProp("pending_withdraw", amount, "float");

  let reqId = "WD" + user.telegramid + "_" + Date.now();

  Bot.setProp(reqId, JSON.stringify({
    telegramid: user.telegramid,
    first_name: user.first_name || "User",
    amount: amount,
    wallet: wallet,
    status: "pending"
  }));

  Bot.setProp(
    "pending_count",
    parseInt(Bot.getProp("pending_count", 0)) + 1,
    "integer"
  );

  Bot.sendMessage({
    chat_id: ADMIN_ID,
    text:
      "🚨 New Withdrawal\n\n" +
      "👤 " + (user.first_name || "User") + "\n" +
      "🆔 " + user.telegramid + "\n" +
      "💰 $" + amount.toFixed(2) + " USDT\n" +
      "👛 " + wallet + "\n\n" +
      "✅ /approve " + reqId + "\n" +
      "❌ /reject " + reqId
  });

  Bot.sendMessage(
    "✅ Withdrawal Request Submitted\n\n" +
    "💰 Amount: $" + amount.toFixed(2) + " USDT\n" +
    "👛 Wallet: " + wallet + "\n" +
    "💵 Remaining Balance: $" + newBalance.toFixed(2) + " USDT\n" +
    "⏳ Status: Pending"
  );

  return;

} else if (waitingBroadcast === "1" && isAdmin) {

  User.setProp("waiting_broadcast", "0");

  Bot.setProp("broadcast_msg", text);

  Bot.runAll({
    command: "/do_broadcast",
    for_chats: "private-chats"
  });

  Bot.sendMessage("📣 Broadcast started.");

  return;

} else if (waitingGenPromo === "1" && isAdmin) {

  User.setProp("waiting_genpromo", "0");

  let parts = text.split(" ");

  let count = parseInt(parts[0]) || 5;
  let amount = parseFloat(parts[1]) || 0.5;
  let maxUses = parseInt(parts[2]) || 1;

  if (count > 50) {
    Bot.sendMessage("❌ Maximum 50 codes allowed.");
    return;
  }

  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codes = [];

  for (let i = 0; i < count; i++) {

    let code;

    do {

      code = "";

      for (let j = 0; j < 8; j++) {
        code += chars.charAt(
          Math.floor(Math.random() * chars.length)
        );
      }

    } while (Bot.getProp("promo_" + code));

    Bot.setProp(
      "promo_" + code,
      JSON.stringify({
        value: amount,
        max_uses: maxUses,
        uses: 0,
        active: true
      })
    );

    codes.push(code);
  }

  Bot.sendMessage(
    "✅ " + count + " Promo Codes Generated\n\n" +
    codes.join("\n")
  );

  return;
}
