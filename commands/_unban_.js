/*CMD
  command: /unban_
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
Bot.setProp({ name: "is_banned", value: "false", user_telegramid: targetId });

Bot.sendMessage("✅ User `" + targetId + "` has been unbanned.");
Bot.sendMessage({ text: "✅ Your account has been unbanned. Welcome back!", chat_id: targetId });
