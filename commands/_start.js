/*CMD
  command: /start
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

function onTouchOwnLink() {
  Bot.sendMessage("⚠️ This is your own referral link!");
}

function onAlreadyAttracted() {
  // already registered, show menu
}

function onAttracted(byUser) {
  let refBonus = parseFloat(Bot.getProp("ref_bonus", 0.1));
  let byUserBalance = parseFloat(Bot.getProp({ name: "balance", user_telegramid: byUser.telegramid }) || 0);
  Bot.setProp({ name: "balance", value: byUserBalance + refBonus, user_telegramid: byUser.telegramid, type: "float" });

  let refCount = parseInt(Bot.getProp({ name: "ref_count", user_telegramid: byUser.telegramid }) || 0);
  Bot.setProp({ name: "ref_count", value: refCount + 1, user_telegramid: byUser.telegramid, type: "integer" });

  Bot.sendMessage({
    text: "🎉 *New Referral!*\n\n💰 +$" + refBonus + " USDT added to your balance!",
    chat_id: byUser.telegramid
  });
}

RefLib.track({
  onTouchOwnLink: onTouchOwnLink,
  onAlreadyAttracted: onAlreadyAttracted,
  onAttracted: onAttracted
});

if (chat.just_created) {
  User.setProp("joined_at", Date.now(), "integer");
  User.setProp("balance", 0, "float");
}

Bot.sendMessage(
  "🚀 *Welcome to NxT Giveaway Bot!*\n\n" +
  "💰 Earn USDT by inviting friends\n" +
  "🎁 Redeem promo codes for instant balance\n" +
  "💸 Withdraw to your BEP-20 wallet\n\n" +
  "Choose an option below 👇"
);

Bot.sendKeyboard(
  "💰 Balance, 👥 Invite Friends\n" +
  "🎫 Promo Code, 💸 Withdraw\n" +
  "🚪 Channel Access, 🏆 Leaderboard\n" +
  "📊 My Stats, ❓ Help",
  "📌 Main Menu"
);
