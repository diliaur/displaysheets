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
		valueNames: [ 'name', {name: 'url', attr: 'href'}, 'fundsource', 'fundingtype', 'length',
					  'placeofstudy', 'seacountryfocus', 'disciplinefocus',
					  'gradelevel', 'citizenship', 'contactname', 'contactemail'],
		item: '<tr><td class="name">Name</td><td><a class="url" target="_blank">More Info</a></td><td class="fundsource">Funding Source</td><td class="fundingtype">Funding Type</td><td class="length">Length</td><td class="placeofstudy">Place of Study</td><td class="seacountryfocus">SEA Country Focus</td><td class="disciplinefocus">Discipline Focus</td><td class="gradelevel">Class Level</td><td class="citizenship">Citizenship Requirement</td><td class="contactname">Contact Name</td><td class="contactemail">Contact Email</td></tr>'
	};

	var awardList = new List('award-wrapper', options, data);


	/* ---------------------------------------------------------------------- *
	 *
	 * FILTER CHECK BOXES
	 *
	 * ---------------------------------------------------------------------- */

	/* Checkbox Filter Function
	--------------------------------------------------------------------------*/

	// function comparison
	function filter_by_checkbox(elementName,targetField='',includeTerms=[],excludeTerms=[]) {
		let e = document.getElementById(elementName);
		e.addEventListener('click',function(){
			if (e.checked) {

				// converts term lists to arrays if they aren't, for looping purposes
				// really only works if there is a single term
				if (!Array.isArray(includeTerms)) {
					includeTerms = new Array(includeTerms);
				}
				if (!Array.isArray(excludeTerms)) {
					excludeTerms = new Array(excludeTerms);
				}

				awardList.filter( function(row) {

					// test if any of the required includeTerms is found in the phrase
					hasIncludeTerm = false;

					includeTerms.forEach( e => {
						if (row.values()[targetField].toLowerCase().includes(e)) {
							hasIncludeTerm = true;
						}
					});

					// test if targetField has any excludeTerms
					//   if it has excludeTerms, the field does not match the query
					//   example: we want a query for US citizenship to match with
					//       the term "US" but not with the term "non-US", of which
					//       "US" is a substring. So we need to explicitly exclude
					//       "non-US".
					hasExcludeTerm = false;

					excludeTerms.forEach( e => {
						if (row.values()[targetField].toLowerCase().includes(e)) {
							hasExcludeTerm = true;
						}
					});

					/* EDGE CASE TO BE FIXED:
						If there are both include terms and exclude terms, and
						the exclude term is a subset or the include terms or
						vice-versa, then... what do?
					*/


					if (hasIncludeTerm && !hasExcludeTerm) {
						return true;
					} else {
						return false;
					}

				});

			} else { // return to full list if box unchecked
				awardList.filter();
			}
		});
	}

	/* Filter by Country
	--------------------------------------------------------------------------*/

	seaCountries = [['brunei','country-brunei'],['cambodia','country-cambodia'],
	['indonesia','country-indonesia'],['laos','country-laos'],
	['malaysia','country-malaysia'],['myanmar','country-myanmar'],
	['philippines','country-philippines'],['singapore','country-singapore'],
	['thailand','country-thailand'],['timor-leste','country-timor-leste'],
	['vietnam','country-vietnam']];

	seaCountries.forEach( function(country) {
		// parameters: elementName, targetField, includeTerms (nothing to exclude)
		filter_by_checkbox(country[1],'seacountryfocus',country[0]);
	});

	/* Filter by Scholarship Criteria (e.g. internal/external funding)
	--------------------------------------------------------------------------*/

	filter_by_checkbox('fund-source-internal','fundsource',['internal']);
	filter_by_checkbox('fund-source-external','fundsource',['external']);

	/* Filter by Citizenship
	--------------------------------------------------------------------------*/

	filter_by_checkbox('eligibility-citizenship-us','citizenship',
					   ['us','united states'],['non-us']);


	// can't use filter_by_checkbox() because this is kind of a special case. UGH
	// also this filter doesn't really work at the moment.
	// let boxNonUS = document.getElementById('eligibility-citizenship-nonus');
	// boxNonUS.addEventListener('click',function() {
	// 	if (boxNonUS.checked) {
	// 		awardList.filter( function(item) {
	// 			let re = /([^us])/gi;
	// 			if (item.values().citizenship.match(re)) {
	// 				return true;
	// 			} else {
	// 				return false;
	// 			}
	// 		});
	// 	} else {
	// 		awardList.filter();
	// 	}
	// });

	/* Grade/class Level
	--------------------------------------------------------------------------*/

	// * undergrad awards
	filter_by_checkbox('eligibility-level-undergraduate','gradelevel',['undergrad','undergraduate']);

	// * grad awards
	//   those which contain the term 'grad/graduate' but not
	//   as part of the word 'undergrad/undergraduate'. This one is tricky because its
	//   include term is a subset of another word that may exist in the same field.
	//   SO WE USE REGULAR EXPRESSIONS
	let boxGraduate = document.getElementById('eligibility-level-graduate');
	boxGraduate.addEventListener('click',function(){
		if (boxGraduate.checked) { // filter
			awardList.filter( function(item) {
				let re = /(\bgraduate)/gi; // regular expression matching only 'graduate' (case-insensitive flag 'i')
				if (item.values().gradelevel.match(re)) {
					return true;
				} else {
					return false;
				}
			});
		} else { // reset
			awardList.filter();
		}
	});

	// * professional awards
	filter_by_checkbox('eligibility-level-professional','gradelevel',['professional']);

}

window.addEventListener('DOMContentLoaded', init)

/* ------------------------------ *
 * Sticky table header
 * ------------------------------ */

// if the table header hits the top of the window it should stick

$(document).ready( function() { //jquery

	// grab all th
	// let sticky_header = document.getElementsByTagName("th");
	// // find height of scroll bar so it can push down the sticky header
	// let buffer_height = document.getElementById("search-wrapper").clientHeight;
	//
	// // INLINE (:'() styles to add to each th
	// let styles = {
	// 	"position":"sticky",
	// 	"top": buffer_height
	// };
	//
	// // add styles to each th
	// for (let i = 0; i < sticky_header.length; i++){
	// 	$(sticky_header[i]).css(styles);
	// }
});


/* ------------------------------ *
 * Checkbox filtration template
 * ------------------------------ */

/* ---------------------------------------- *
 * Target a "collapsible" element's control
 * ---------------------------------------- */

// toggles text between "See more" and "See less"

$(document).ready( function() { // jquery v
	let toggle_items = document.getElementsByClassName('s-collapse-toggle');

	for (let i = 0; i < toggle_items.length; i++) { // add to all class members
		toggle_items[i].addEventListener('click',function(){
			if ( toggle_items[i].innerText.toLowerCase() == "see more" ) {
				toggle_items[i].innerText = "See less";
			} else if ( toggle_items[i].innerText.toLowerCase() == "see less" ) {
				toggle_items[i].innerText = "See more";
			}
		});
	}
});
