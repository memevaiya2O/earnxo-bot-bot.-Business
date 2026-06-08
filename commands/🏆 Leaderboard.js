/*CMD
  command: 🏆 Leaderboard
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

let list = RefLib.getTopList();
let items = list.get();

if (!items || items.length === 0) {
  Bot.sendMessage("🏆 No leaderboard data yet. Be the first! 🚀");
  return;
}

let msg = "🏆 *Top Referrers*\n\n";
let medals = ["🥇", "🥈", "🥉"];
let prizes = JSON.parse(Bot.getProp("prizes", '["$5","$3","$1"]'));

for (var i in items) {
  let idx = parseInt(i);
  let medal = medals[idx] || "👤";
  let prize = prizes[idx] ? " — " + prizes[idx] : "";
  msg += medal + " " + CommonLib.getLinkFor(items[i].user) +
         ": *" + items[i].value + " refs*" + prize + "\n";
}

let endDate = Bot.getProp("contest_end", "");
if (endDate) {
  msg += "\n⏰ Contest ends: *" + endDate + "*";
}

Bot.sendMessage(msg);
