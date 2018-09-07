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
			$('.fund-source',tempAward).append(scholarship.fundsource);
			$('.fund-source',tempAward).addClass("award-info-style");
			// contextualizing the element selection with the second param is also important in applying class
		} else {
			$('.fund-source',tempAward).detach();
		}
		if (scholarship.length) {
			$('.length',tempAward).append(scholarship.length);
			$('.length',tempAward).addClass("award-info-style");
		} else {
			$('.length',tempAward).detach();
		}
		if (scholarship.fundingtype) {
			$('.type',tempAward).append(scholarship.fundingtype);
			$('.type',tempAward).addClass("award-info-style");
		} else {
			$('.type',tempAward).detach();
		}
		if (scholarship.placeofstudy) {
			$('.place-of-study',tempAward).append(scholarship.placeofstudy);
			$('.place-of-study',tempAward).addClass("award-info-style");
		} else {
			$('.place-of-study',tempAward).detach();
		}
		if (scholarship.seacountryfocus) {
			$('.sea-country-focus',tempAward).append(scholarship.seacountryfocus);
			$('.sea-country-focus',tempAward).addClass("award-info-style");
		} else {
			$('.sea-country-focus',tempAward).detach();
		}
		if (scholarship.disciplinefocus) {
			$('.discipline-focus',tempAward).append(scholarship.disciplinefocus);
			$('.discipline-focus',tempAward).addClass("award-info-style");
		} else {
			$('.discipline-focus',tempAward).detach();
		}
		
		// eligibility info
		if (scholarship.gradelevel && scholarship.citizenship) {
			if (scholarship.gradelevel) {
				$('.class-level',tempAward).append(scholarship.gradelevel);
				$('.class-level',tempAward).addClass("award-info-style");
			} else {
				$('.class-level',tempAward).detach();
			}
			if (scholarship.citizenship) {
				$('.citizenship',tempAward).append(scholarship.citizenship);
				$('.citizenship',tempAward).addClass("award-info-style");
			} else {
				$('.citizenship',tempAward).detach();
			}
		} else { // sometimes there aren't class level or citizenship restrictions, so print:
			$('.citizenship',tempAward).detach();
			$('.class-level',tempAward).detach();
			$('.award-eligibility',tempAward).append("<p>There are no class level or citizenship restrictions.</p>");
		}
		
		// more info
		$('.website',tempAward).append('<a href=\'' + scholarship.url + '\'><strong>Website</strong></a><br/>');  // no if because there should always be a URL
		if (scholarship.contactname && scholarship.contactemail) {
			$('.contact-point',tempAward).append(scholarship.contactname + ' (<a href=\'mailto:' + scholarship.contactemail + '\'>' + scholarship.contactemail +'</a>)<br/>'); // IF	
		}
		if (scholarship.description) {
			$('.description',tempAward).append(scholarship.description); // IF
		}
		// -----------------------
		// end award fill out
		// -----------------------

		// append it to the wrapper
		wrapper.append(tempAward);

		});
}

window.addEventListener('DOMContentLoaded', init)
