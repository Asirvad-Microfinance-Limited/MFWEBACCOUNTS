var _General = {

	//noData: function (ctr, msg) {

	//	ctr.empty();
	//	var $table = jQuery('<table class="table">');
	//	var $tbody = jQuery('<tbody>');
	//	var $row = jQuery('<tr/>');
	//	$row.append(jQuery('<td/>').html(msg));
	//	$tbody.append($row);

	//	$tbody.append('</tbody>');
	//	$table.append($tbody);
	//	$table.append('</table>');
	//	ctr.html($table);

	//},
	noData: function (ctr, msg) {

		ctr.empty();
		
        var $table = jQuery('<label for="nodata" style=" color:#a2a7a6;font-size:20px;margin-top: 32px; text-align: center;" >' + msg +'</label>');
		
		ctr.html($table);

	},

}