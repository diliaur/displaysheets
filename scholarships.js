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
	function filter_checkbox(elementName,targetField,includeTerms) {
		let e = document.getElementById(elementName);
		e.addEventListener('click',function(){
			if (e.checked) {
				// if targetField has includeTerms but not excludeTerms...
				let test_targetField = "this is a sentence";
				let result = function() {
					includeTerms.forEach( e => {
						console.log(e);
					});
				}; //ok this just returns the function but MAYBE THIS IS A KEY

				console.log("---" + result);
			}
		});
	}

	filter_checkbox('country-brunei','',['this','not']);

	/* Country
	--------------------------------------------------------------------------*/

	/* Scholarship Criteria (e.g. internal/external funding)
	--------------------------------------------------------------------------*/
	
	/* Citizenship
	--------------------------------------------------------------------------*/

	let boxUS = document.getElementById('eligibility-citizenship-us');
	boxUS.addEventListener('click',function(){
		if (boxUS.checked) {

			awardList.filter( function(item) {
				if ((item.values()['citizenship'].toLowerCase().search("us") != -1) ||
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