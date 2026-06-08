/*CMD
  command: /addbal_
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
Bot.setProp({ name: "balance", value: balance + 1, user_telegramid: targetId, type: "float" });

Bot.sendMessage("✅ Added *$1.00* to user `" + targetId + "`\nNew balance: *$" + (balance + 1).toFixed(2) + "*");
Bot.sendMessage({ text: "💰 *$1.00 USDT* has been added to your balance by Admin!", chat_id: targetId });
