// Google Apps Script — paste into Extensions > Apps Script inside your Google Sheet.
// Sheet tab name: "RSVP"  |  Row 1 headers: Timestamp | Name | Attendance | Guests | Message
const SHEET = "RSVP";

function sh_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  if (s.getLastRow() === 0) s.appendRow(["Timestamp", "Name", "Attendance", "Guests", "Message"]);
  return s;
}

// Receives RSVP from the website; adds one row per submission
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const clean = v => String(v || "").replace(/^[=+\-@]/, "'$&").slice(0, 400); // block formula injection
    sh_().appendRow([new Date(), clean(d.name), clean(d.attendance), Number(d.guests) || 1, clean(d.message)]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Returns wishes (name + message), newest first, for the website
function doGet() {
  const rows = sh_().getDataRange().getValues().slice(1);
  const tz = Session.getScriptTimeZone();
  const out = rows.filter(r => r[1] && r[4]).reverse().slice(0, 100).map(r => ({
    name: r[1],
    message: r[4],
    date: Utilities.formatDate(new Date(r[0]), tz, "d MMM yyyy")
  }));
  return json_(out);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
