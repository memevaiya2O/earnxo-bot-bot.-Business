/*CMD
  command: /cutbal_
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

if (String(user.telegramid) !== "8373846582") { return; }

let targetId = params;
let balance = parseFloat(Bot.getProp({ name: "balance", user_telegramid: targetId }) || 0);
let newBal = Math.max(0, balance - 1);
Bot.setProp({ name: "balance", value: newBal, user_telegramid: targetId, type: "float" });

Bot.sendMessage("✅ Cut *$1.00* from user `" + targetId + "`\nNew balance: *$" + newBal.toFixed(2) + "*");
Bot.sendMessage({ text: "⚠️ *$1.00 USDT* has been deducted from your balance by Admin.", chat_id: targetId });
