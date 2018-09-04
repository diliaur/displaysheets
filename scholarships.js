console.log("connected!"); // runs before any of the doc is loaded.

/* Link to the spreadsheet */
// https://docs.google.com/spreadsheets/d/13JTS8DX4z5BZ6bTwgkmssxcERodv6Tl5OKaj_EJ2qIA/edit?usp=sharing

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
	// console.log(data);

	var wrapper = $('.award-wrapper');
	var award = $('.award',wrapper).clone();
	wrapper.empty(); // make room for new appends

	data.forEach( scholarship => {
		// copy the original EMPTY award div) as a temp
		var tempAward = award.clone();
		
		// -----------------------
		// fill out the temp award
		// -----------------------
		// about the award
		$('.award-header',tempAward).append(scholarship.name);
		$('.fund-source',tempAward).append('Fund source: ' + scholarship.fundsource);
		$('.length',tempAward).append('Length: ' + scholarship.length);
		$('.type',tempAward).append('Funding type: ' + scholarship.fundingtype);
		$('.place-of-study',tempAward).append('Place of study: ' + scholarship.placeofstudy);
		$('.sea-country-focus',tempAward).append('SEA country focus: ' + scholarship.seacountryfocus);
		$('.discipline-focus',tempAward).append('Discipline focus: ' + scholarship.disciplinefocus);
		// eligibility info
		$('.class-level',tempAward).append('Class level: ' + scholarship.gradelevel);
		$('.citizenship',tempAward).append('Citizenship: ' + scholarship.citizenship);
		// more info
		$('.website',tempAward).append('<a href=\'' + scholarship.url + '\'>Website</a>');
		$('.contact-point',tempAward).append('Contact point: ' + scholarship.contactname + ' (' + scholarship.contactemail + ')');
		$('.description',tempAward).append('Description:<br/>' + scholarship.description);

		// $('.',tempAward).append(': ' + scholarship.);

		// -----------------------
		// end award fill out
		// -----------------------

		// append it to the wrapper
		wrapper.append(tempAward);

		});

}

window.addEventListener('DOMContentLoaded', init)
