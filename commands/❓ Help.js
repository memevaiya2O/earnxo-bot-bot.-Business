/*CMD
  command: ❓ Help
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

Bot.sendMessage(
  "❓ *How This Bot Works*\n\n" +
  "1️⃣ *Invite Friends* — Share your referral link. Earn $" + Bot.getProp("ref_bonus", 0.1) + " USDT per referral\n\n" +
  "2️⃣ *Promo Codes* — Enter codes from our channel for instant balance\n\n" +
  "3️⃣ *Withdraw* — Once you reach $" + Bot.getProp("min_withdraw", 0.5) + " USDT, withdraw to your BEP-20 wallet\n\n" +
  "4️⃣ *Channel Access* — Get 24h free access or invite " + Bot.getProp("ref_target", 3) + " friends for permanent access\n\n" +
  "📌 *Rules:*\n" +
  "• Fake referrals = permanent ban\n" +
  "• One promo code per user\n" +
  "• Withdrawals processed within 24h\n\n" +
  "📢 Support: @zerox6t9"
);
