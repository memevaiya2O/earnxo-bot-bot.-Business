/*CMD
  command: @
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

if (chat.chat_type == "private") {
  let banned = User.getProp("is_banned", false);
  if (banned) {
    Bot.sendMessage("🚫 You have been banned.");
    return;
  }
  if (chat.just_created) {
    let totalUsers = Bot.getProp("total_users", 0);
    Bot.setProp("total_users", parseInt(totalUsers) + 1, "integer");
  }
}
