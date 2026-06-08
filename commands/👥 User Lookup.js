/*CMD
  command: 👥 User Lookup
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
  Bot.sendMessage("👥 Send Telegram ID to look up user:\n\nExample: `123456789`");
  return;
}

let targetId = message.trim();
let res = Libs.ResourcesLib.anotherUserRes("balance", targetId);
let refCount = Bot.getProp({ name: "ref_count", user_telegramid: targetId }) || 0;
let wallet = Bot.getProp({ name: "wallet", user_telegramid: targetId }) || "Not set";

Bot.sendInlineKeyboard([
  { title: "➕ Add $1", command: "/addbal_" + targetId + "_1" },
  { title: "➖ Cut $1", command: "/cutbal_" + targetId + "_1" },
  { title: "🚫 Ban User", command: "/ban_" + targetId }
],
  "👤 *User Info*\n\n" +
  "🆔 TG ID: `" + targetId + "`\n" +
  "💰 Balance: *$" + res.value().toFixed(2) + " USDT*\n" +
  "👥 Referrals: *" + refCount + "*\n" +
  "👛 Wallet: `" + wallet + "`"
);
