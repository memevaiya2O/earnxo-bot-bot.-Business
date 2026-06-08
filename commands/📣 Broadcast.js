/*CMD
  command: 📣 Broadcast
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
  Bot.sendMessage("📣 *Broadcast Message*\n\nSend the message to broadcast to ALL users:");
  return;
}

Bot.setProp("broadcast_msg", message);
Bot.runAll({
  command: "/do_broadcast",
  for_chats: "private-chats"
});

Bot.sendMessage("📣 Broadcast started for all users!");
