/*CMD
  command: /reject
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

if (String(user.telegramid) !== "8373846582") {
  Bot.sendMessage("⛔ Access Denied.");
  return;
}

let reqId = params;
if (!reqId) { Bot.sendMessage("❌ No request ID provided."); return; }

let reqRaw = Bot.getProp(reqId);
if (!reqRaw) { Bot.sendMessage("❌ Request not found."); return; }

let req = JSON.parse(reqRaw);

if (req.status !== "pending") {
  Bot.sendMessage("⚠️ This request is already " + req.status);
  return;
}

req.status = "rejected";
Bot.setProp(reqId, JSON.stringify(req));

let pendingCount = parseInt(Bot.getProp("pending_count", 1));
Bot.setProp("pending_count", Math.max(0, pendingCount - 1), "integer");

let currentBalance = parseFloat(Bot.getProp({ name: "balance", user_telegramid: req.telegramid }) || 0);
Bot.setProp({ name: "balance", value: currentBalance + req.amount, user_telegramid: req.telegramid, type: "float" });

Bot.setProp({ name: "pending_withdraw", value: 0, user_telegramid: req.telegramid, type: "float" });

Bot.sendMessage({
  text: "❌ *Withdrawal Rejected*\n\n" +
        "💰 *$" + req.amount.toFixed(2) + " USDT* has been refunded to your balance.\n\n" +
        "Please contact support for details. 📢",
  chat_id: req.telegramid
});

Bot.sendMessage("❌ Rejected and refunded *$" + req.amount.toFixed(2) + "* to user `" + req.telegramid + "`");
