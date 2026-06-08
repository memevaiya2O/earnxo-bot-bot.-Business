/*CMD
  command: 🚪 Channel Access
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

let channelLink = Bot.getProp("channel_link", "https://t.me/nxt_coder");
let channelName = Bot.getProp("channel_name", "NxT Coder");
let refTarget = parseInt(Bot.getProp("ref_target", 3));
let refCount = parseInt(User.getProp("ref_count", 0));
let freeExpiry = parseInt(User.getProp("free_access_expiry", 0));
let now = Date.now();

let statusText = "";

if (freeExpiry > now) {
  let hoursLeft = Math.floor((freeExpiry - now) / 1000 / 3600);
  statusText = "⏳ *Free Access:* " + hoursLeft + " hours left";
} else if (refCount >= refTarget) {
  statusText = "✅ *Status:* Permanent Access Unlocked!";
} else {
  statusText = "❌ *Status:* No Active Access";
  User.setProp("free_access_expiry", now + (24 * 60 * 60 * 1000), "integer");
  statusText = "🎁 *24h Free Access* just granted!";
}

Bot.sendInlineKeyboard([
  { title: "📢 Join Channel", url: channelLink }
],
  "🚪 *Channel Access*\n\n" +
  "📌 Channel: *" + channelName + "*\n" +
  "🔗 Link: " + channelLink + "\n\n" +
  statusText + "\n\n" +
  "👥 Your Referrals: *" + refCount + "/" + refTarget + "*\n" +
  "🏆 Invite *" + refTarget + " friends* for permanent access!"
);
