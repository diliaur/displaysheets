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

				if (!Array.isArray(includeTerms)) {
					includeTerms = new Array(includeTerms);
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

					// if it has at least one includTerm and none of the exclude
					//   terms, then filter the rows. Otherwise do nothing.
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
	
	/* Filter by Citizenship
	--------------------------------------------------------------------------*/

	let boxUS = document.getElementById('eligibility-citizenship-us');
	boxUS.addEventListener('click',function(){
		if (boxUS.checked) {

			test = 'citizenship';
			awardList.filter( function(item) {
				if ((item.values()[test].toLowerCase().search("us") != -1) ||
					(item.values()['citizenship'].toLowerCase().search("united states") != -1) &&
				    (item.values()['citizenship'].toLowerCase().search("non-us") == -1)) {
					return true;
				} else {
					return false;
				}
			});
			
		} else {
			awardList.filter();
		}
	});

	let boxNonUS = document.getElementById('eligibility-citizenship-nonus');
	boxNonUS.addEventListener('click',function() {
		if (boxNonUS.checked) {
			awardList.filter( function(item) {
				if (item.values().citizenship.toLowerCase().search("non-us") != -1 ||
					item.values().citizenship.toLowerCase().search("us") == -1) {
					return true;
				} else {
					return false;
				}
			});
		} else {
			awardList.filter();
		}
	});

	/* Grade/class Level
	--------------------------------------------------------------------------*/

}

window.addEventListener('DOMContentLoaded', init)

/* ------------------------------ *
 * Sticky header
 * ------------------------------ */

// if the header hits the top of the window it should stick

/* ------------------------------ *
 * Checkbox filtration template
 * ------------------------------ */