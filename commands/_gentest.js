/*CMD
  command: /gentest
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

Bot.setProp("promo_TEST1234", JSON.stringify({
  value: 0.5,
  max_uses: 10,
  uses: 0,
  active: true
}));

Bot.sendMessage("✅ Test promo created!\n\nCode: `TEST1234`\nValue: $0.50\nUses: 10");
