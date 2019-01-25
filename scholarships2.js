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

	/*
	 * ListJS initialization
	 */
	var options = {
		valueNames: [ 'name', {name: 'url', attr: 'href'}, 'fundsource', 'fundingtype', 'length',
						'placeofstudy', 'seacountryfocus', 'disciplinefocus',
						'gradelevel', 'citizenship', 'contactname', 'contactemail'],
		item: '<tr><td class="name">Name</td><td><a class="url" target="_blank">More Info</a></td><td class="fundsource">Funding Source</td><td class="fundingtype">Funding Type</td><td class="length">Length</td><td class="placeofstudy">Place of Study</td><td class="seacountryfocus">SEA Country Focus</td><td class="disciplinefocus">Discipline Focus</td><td class="gradelevel">Class Level</td><td class="citizenship">Citizenship Requirement</td><td class="contactname">Contact Name</td><td class="contactemail">Contact Email</td></tr>'
	};

	var awardList = new List('list-wrapper', options, data); // attach list to HTML element

	/*
	 * List filtration controls
	 */

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

	// FILTER BY COUNTRY
	// -----------------------------------------------------------------------

	let checked_country_boxes = []; // this is the tracker for what boxes have been checked!

	function filter_by_country( elementId ) {
		document.getElementById(elementId).addEventListener('click',function(){
			if (document.getElementById(elementId).checked) {

				// append current country to 'checked_country_boxes'
				checked_country_boxes.push(this.value);
				console.log(this,this.id,this.value);

				// filter the list by checked_country_boxes
				awardList.filter(function(row){
					let filter = false; // whether to filter or not
					checked_country_boxes.forEach(e => {
						// if the 'seacountryfocus' col contains ANY of the checked_country_boxes
						//   which SHOULD include Brunei by default since it's been added above
						if(row.values()['seacountryfocus'].toLowerCase().includes(e.toLowerCase())) {
							filter = true;
						} // no else, because if it never hits any of these IFs then it's already false
					});
					return filter;
				});
				console.log(checked_country_boxes);
			} else { // unchecked
				// remove current country from 'checked_country_boxes'
				let remove_i = checked_country_boxes.indexOf(this.value);
				if (remove_i > -1) {
					checked_country_boxes.splice(remove_i,1); // splice out country
					console.log(checked_country_boxes);
				}
				// filter the list again -- either empty or with remaining countries
				if (checked_country_boxes != "") { // if there are elements
					awardList.filter(function(row){
						let filter = false; // whether to filter or not
						checked_country_boxes.forEach(e => {
							// if the 'seacountryfocus' col contains ANY of the checked_country_boxes
							//   which SHOULD include Brunei by default since it's been added above
							if(row.values()['seacountryfocus'].toLowerCase().includes(e.toLowerCase())) {
								filter = true;
								console.log(e);
							} // no else, because if it never hits any of these IFs then it's already false
						});
						return filter;
					});
				} else { // no elements to filter on
					awardList.filter();
				}
			}
		});
	}

	let countryCheckboxIds = ['country-brunei','country-cambodia','country-indonesia',
	'country-laos','country-malaysia','country-myanmar','country-philippines',
	'country-singapore','country-thailand','country-timor-leste','country-vietnam'];

	// Attaching all event listeners etc
	countryCheckboxIds.forEach( function(countryElementId) {
		filter_by_country(countryElementId,'seacountryfocus');
	});

	// FILTER BY FUND SOURCE
	// -----------------------------------------------------------------------
	filter_by_checkbox('fund-source-internal','fundsource',['internal']);
	filter_by_checkbox('fund-source-external','fundsource',['external']);

	// so that only one is checked at a time --
	// (fund source can't be both internal & external)
	let fund_in = document.getElementById('fund-source-internal');
	let fund_ex = document.getElementById('fund-source-external');

	fund_in.addEventListener('click',function(){
		if (fund_in.checked) {
			fund_ex.checked = false; // uncheck the other one.
		}
	});

	fund_ex.addEventListener('click',function(){
		if (fund_ex.checked) {
			fund_in.checked = false; // uncheck the other one.
		}
	});

	// FILTER BY CITIZENSHIP
	// -----------------------------------------------------------------------
	// US Citizenship
	filter_by_checkbox('eligibility-citizenship-us','citizenship',
						 ['us','united states'],['non-us']);

	// FILTER BY GRADE/PROFESSIONAL LEVEL
	// -----------------------------------------------------------------------
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

	//========================================================================
	// REUSABLE FUNCTIONS

	/**
	 * Check/Uncheck function
	 * Controls what happens when the checkbox is checked or unchecked.
	 * Called by event listener.
	 */
	function if_checked() { // need to decide params

	}

	/**
	 * Reusable filter wrapper function
	 * Is called by the Check/Uncheck function. Determines how to apply
	 * filters or whether to unfilter the list.
	 **/
	function checked_filter() { // need to decide on params

	}

}

window.addEventListener('DOMContentLoaded', init) // actually calls the tabletop code
