// console.log("connected!");

/* 
* processing data from google sheet via Tabletop
*/
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/13JTS8DX4z5BZ6bTwgkmssxcERodv6Tl5OKaj_EJ2qIA/edit?usp=sharing';

function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
	                 callback: showInfo,
	                 simpleSheet: true, 
	             	 prettyColumnNames: false} )
}

function showInfo(data, tabletop) {
	console.log('Successfully processed!')
	// data is an array of objects
	console.log(data);

	/* do the list.js stuff ... in here I guess */

	var options = {
		valueNames: [ 'name', 'length' ],
		item: '<div class="award"><div class="name"></div><div class="length"></div></div>'
	};

	var userList = new List('award-wrapper', options, data);

}

window.addEventListener('DOMContentLoaded', init)

