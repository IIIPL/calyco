// =============================================================================
// Calyco Painting Calculator — Google Apps Script (Drive uploader only)
// =============================================================================
// SETUP (one time):
//  1. Open your Google Sheet → Extensions → Apps Script
//  2. Delete any existing code and paste this entire file
//  3. Click Deploy → New Deployment → Web App
//       Execute as:    Me
//       Who has access: Anyone
//  4. Click Deploy → copy the Web App URL
//  5. In src/pages/BudgetCalculator.jsx set:
//       const APPS_SCRIPT_URL = '<paste URL here>';
// =============================================================================

var DRIVE_ROOT = '1MsjsWU9LhKvVoGxg-FwmsKrSU5HkEKqo';

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Calyco Drive Uploader — OK' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Accept form payload (hidden-form upload) or raw JSON body
    var raw  = (e.parameter && e.parameter.payload)
                 ? e.parameter.payload
                 : e.postData.contents;
    var data = JSON.parse(raw);

    if (!data.files || data.files.length === 0) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // folderId arrives as URL query param ?fid= (most reliable — separate from JSON payload)
    var fid    = (e.parameter && e.parameter.fid) || (data && data.folderId) || '';
    var folder;
    if (fid) {
      folder = DriveApp.getFolderById(fid);
    } else {
      var parent = DriveApp.getFolderById(DRIVE_ROOT);
      var ts     = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd-MMM-yyyy HH:mm');
      folder     = parent.createFolder((data.name || 'Customer') + ' — ' + ts);
    }

    for (var i = 0; i < data.files.length; i++) {
      var f     = data.files[i];
      var bytes = Utilities.base64Decode(f.base64);
      var blob  = Utilities.newBlob(bytes, f.mimeType || 'application/octet-stream', f.name);
      folder.createFile(blob);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
