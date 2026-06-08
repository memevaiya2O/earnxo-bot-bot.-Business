/*CMD
  command: /do_broadcast
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

let msg = Bot.getProp("broadcast_msg");
if (!msg) { return; }
Bot.sendMessage(msg);
