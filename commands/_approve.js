/*CMD
  command: /approve
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
if (!reqRaw) { Bot.sendMessage("❌ Request not found: `" + reqId + "`"); return; }

let req = JSON.parse(reqRaw);

if (req.status !== "pending") {
  Bot.sendMessage("⚠️ This request is already " + req.status);
  return;
}

req.status = "approved";
Bot.setProp(reqId, JSON.stringify(req));

let pendingCount = parseInt(Bot.getProp("pending_count", 1));
Bot.setProp("pending_count", Math.max(0, pendingCount - 1), "integer");

let totalPaid = parseFloat(Bot.getProp("total_paid", 0));
Bot.setProp("total_paid", totalPaid + req.amount, "float");

Bot.setProp({ name: "pending_withdraw", value: 0, user_telegramid: req.telegramid, type: "float" });

let prevWithdrawn = parseFloat(Bot.getProp({ name: "total_withdrawn", user_telegramid: req.telegramid }) || 0);
Bot.setProp({ name: "total_withdrawn", value: prevWithdrawn + req.amount, user_telegramid: req.telegramid, type: "float" });

Bot.sendMessage({
  text: "✅ *Withdrawal Approved!*\n\n" +
        "💰 Amount: *$" + req.amount.toFixed(2) + " USDT*\n" +
        "👛 Wallet: `" + req.wallet + "`\n\n" +
        "✅ Your payment has been sent!\n" +
        "Thank you! 🚀",
  chat_id: req.telegramid
});

Bot.sendMessage("✅ Approved *$" + req.amount.toFixed(2) + "* for user `" + req.telegramid + "`");
