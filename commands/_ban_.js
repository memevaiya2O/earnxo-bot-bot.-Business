/*CMD
  command: /ban_
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
Bot.setProp({ name: "is_banned", value: "true", user_telegramid: targetId });

Bot.sendMessage("🚫 User `" + targetId + "` has been banned.");
Bot.sendMessage({ text: "🚫 You have been banned for violating our rules.", chat_id: targetId });
