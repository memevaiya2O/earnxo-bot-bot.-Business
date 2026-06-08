/*CMD
  command: 👥 Invite Friends
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

let link = RefLib.getLink();
let refCount = User.getProp("ref_count", 0);
let target = Bot.getProp("ref_target", 3);

Bot.sendMessage(
  "👥 *Invite Friends & Earn!*\n\n" +
  "🔗 Your referral link:\n`" + link + "`\n\n" +
  "👤 Referred so far: *" + refCount + "/" + target + "*\n" +
  "💰 Earn per referral: *$" + Bot.getProp("ref_bonus", 0.1) + " USDT*\n\n" +
  "📣 Share your link and earn for every friend who joins!"
);
