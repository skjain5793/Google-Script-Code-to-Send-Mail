function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Send Emails', functionName: 'sendEmails'}
  ];
  spreadsheet.addMenu('Email', menuItems);
}


// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = "EMAIL_SENT";

function sendEmails() {
  
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet =  spreadsheet.getSheetByName('Email');
  var startRow = 2;  // First row of data to process
  var numRows = sheet.getLastRow()-1;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 4)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0];  // First column
    var subject = row[1];       // Second column
    var message = row[2];       // Third column             
    var emailSent = row[3];     // Fourth column
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      MailApp.sendEmail(emailAddress, subject, message);
      sheet.getRange(startRow + i, 4).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}