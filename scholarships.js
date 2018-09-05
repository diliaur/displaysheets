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
	console.log(data);

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
		$('.award-header',tempAward).append(scholarship.name); // no if because there should always be a name
		if (scholarship.fundsource) {
			$('.fund-source',tempAward).append('<strong>Fund source</strong>: ' + scholarship.fundsource);
		}
		if (scholarship.length) {
			$('.length',tempAward).append('<strong>Length</strong>: ' + scholarship.length);
		}
		if (scholarship.fundingtype) {
			$('.type',tempAward).append('<strong>Funding type</strong>: ' + scholarship.fundingtype);
		}
		if (scholarship.placeofstudy) {
			$('.place-of-study',tempAward).append('<strong>Place of study</strong>: ' + scholarship.placeofstudy);
		}
		if (scholarship.seacountryfocus) {
			$('.sea-country-focus',tempAward).append('<strong>SEA country focus</strong>: ' + scholarship.seacountryfocus);
		}
		if (scholarship.disciplinefocus) {
			$('.discipline-focus',tempAward).append('<strong>Discipline focus</strong>: ' + scholarship.disciplinefocus);
		}
		
		// eligibility info
		if (scholarship.gradelevel) {
			$('.class-level',tempAward).append('<strong>Class level</strong>: ' + scholarship.gradelevel);
		}
		if (scholarship.citizenship) {
			$('.citizenship',tempAward).append('<strong>Citizenship</strong>: ' + scholarship.citizenship);
		}
		
		// more info
		$('.website',tempAward).append('<a href=\'' + scholarship.url + '\'><strong>Website</strong></a><br/>');  // no if because there should always be a URL
		if (scholarship.contactname && scholarship.contactemail) {
			$('.contact-point',tempAward).append('<strong>Contact point</strong>: ' + scholarship.contactname + ' (<a href=\'mailto:' + scholarship.contactemail + '\'>' + scholarship.contactemail +'</a>)<br/>'); // IF	
		}
		if (scholarship.description) {
			$('.description',tempAward).append('<strong>Description</strong>:<br/>' + scholarship.description); // IF
		}
		// -----------------------
		// end award fill out
		// -----------------------

		// append it to the wrapper
		wrapper.append(tempAward);

		});

}

window.addEventListener('DOMContentLoaded', init)
