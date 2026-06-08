/*CMD
  command: set_wallet
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

Bot.sendMessage("👛 *Enter your BEP-20 wallet address:*\n\nExample: `0x1234...abcd`");
User.setProp("waiting_wallet", "set");
