/*CMD
  command: delete_wallet
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

User.setProp("wallet", "");

Bot.sendMessage(
  "🗑 Wallet deleted successfully."
);
