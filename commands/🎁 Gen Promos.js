/*CMD
  command: 🎁 Gen Promos
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

let adminId = Bot.getProp("admin_chat_id");
if (String(user.telegramid) !== String(adminId)) { return; }

if (!message) {
  Bot.sendMessage(
    "🎁 *Generate Promo Codes*\n\n" +
    "Send in format:\n`COUNT AMOUNT MAX_USES`\n\n" +
    "Example: `10 0.5 1`\n" +
    "(10 codes, $0.50 each, 1 use each)"
  );
  return;
}

let parts = message.trim().split(" ");
let count = parseInt(parts[0]) || 5;
let amount = parseFloat(parts[1]) || 0.5;
let maxUses = parseInt(parts[2]) || 1;

if (count > 50) { Bot.sendMessage("❌ Max 50 codes at once."); return; }

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let codes = [];
let msg = "🎁 *Generated Promo Codes* ($" + amount + " each):\n\n";

for (let i = 0; i < count; i++) {
  let code = "";
  for (let j = 0; j < 8; j++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  Bot.setProp("promo_" + code, JSON.stringify({
    value: amount,
    max_uses: maxUses,
    uses: 0,
    active: true
  }));
  codes.push(code);
  msg += "`" + code + "`\n";
}

Bot.sendMessage(msg);

let channelId = Bot.getProp("channel_id");
if (channelId) {
  Bot.sendMessage({
    text: "🎁 *New Promo Codes Available!*\n\n" +
          "💰 Value: *$" + amount + " USDT* each\n" +
          "🔢 Codes:\n\n" + codes.map(c => "`" + c + "`").join("\n") +
          "\n\n⚡ First " + maxUses + " user(s) per code!\nUse 🎫 Promo Code in bot",
    chat_id: channelId
  });
}
