/**
 * This function specifically reads the Output Sheet
 *   and postprocesses the brackets to be BOLD.
 * This is usually used for GOLD
 */
function boldBrackets(output_sheet_name) {
  if (!output_sheet_name) {
    output_sheet_name = "Output"; // Bold the brackets on the Output sheet
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var out_sheet = ss.getSheetByName(output_sheet_name);
  var range = out_sheet.getDataRange();
  var values = out_sheet.getDataRange().getValues();

  /* Sheet cells start at 1,1 */
  var i = 1;
  var j = 1;

  values.forEach(function (row) {
    i = 1;
    row.forEach(function (cell) {
      /* https://stackoverflow.com/q/3573915/5411712
       * $& is replaced with the regex
       *
       * https://stackoverflow.com/a/27213663/5411712
       * this link was helpful for figuring out negative look behind
       */

      /* do replace */
      cell = cell.replace(/((?!([ \*]))|^)\[[A-Za-z0-9\s]*\](?!\*)/g, "*$&*");

      /* set cell value to new string */
      out_sheet.getRange(j, i).setValue(cell);
      Logger.log(cell);
      i++;
    });
    j++;
  });
}
