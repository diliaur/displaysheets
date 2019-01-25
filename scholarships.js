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

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *                                                                           *
	 * ListJS INITIALIZATION                                                     *
	 *                                                                           *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	var options = {
		valueNames: [ 'name', {name: 'url', attr: 'href'}, 'fundsource', 'fundingtype', 'length',
						'placeofstudy', 'seacountryfocus', 'disciplinefocus',
						'gradelevel', 'citizenship', 'contactname', 'contactemail'],
		item: '<tr><td class="name">Name</td><td><a class="url" target="_blank">More Info</a></td><td class="fundsource">Funding Source</td><td class="fundingtype">Funding Type</td><td class="length">Length</td><td class="placeofstudy">Place of Study</td><td class="seacountryfocus">SEA Country Focus</td><td class="disciplinefocus">Discipline Focus</td><td class="gradelevel">Class Level</td><td class="citizenship">Citizenship Requirement</td><td class="contactname">Contact Name</td><td class="contactemail">Contact Email</td></tr>'
	};

	var awardList = new List('list-wrapper', options, data); // attach list to HTML element

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *                                                                           *
	 * ListJS FILTRATION                                                         *
	 *                                                                           *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	 // values for category filters
		 // this filter object will be updated as categories are checked
		 // and used to refilter the list every time

	// if values are set they're for testing purposes
	 let filters = {
		 country: ['Cambodia','Vietnam','Laos'],
		 fundSource: ['Internal'],
		 citizenship: [],
		 classLevel: [],
	 }

	 //////////////////
	 // target_id is the actual checkbox element id
	 // target_category is the category which matches the key in filters, above
	 function filter_by_checkbox(target_id,target_category){

		 // IF CHECKED

				 // first: add value of target_id to filters['target_category']

				 // then: call filter on filters

		 // IF UNCHECKED

		 		// first: if unchecked, remove value of target_id from filters['target_category']
		 
	 }

	 //////////////////

	 document.getElementById(target_id).addEventListener('click', function(){
		 if (this.checked) {
			 awardList.filter( function(row) {
				 let country_filter     = false;
				 let fund_source_filter = false;
				 let citizenship_filter = false;
				 let class_level_filter = false;

				 // checks if any of the filters['country'] terms exist in the row
				 filters.country.forEach( e => {
					 if (row.values()['seacountryfocus'].toLowerCase().includes(e.toLowerCase())) {
						 country_filter = true;
					 }
				 });

				 // checks if any of the filters['fundSource'] terms exist in the row
					 // this one is special -- only one or the other can exist. but this is
					 // handled in the appending to the filter term object
				 filters.fundSource.forEach( e => {
					 if (row.values()['fundsource'].toLowerCase().includes(e.toLowerCase())) {
						 fund_source_filter = true;
					 }
				 });

				 // check for match on citizenship
				 filters.citizenship.forEach ( e => {
					 if (row.values()['citizenship'].toLowerCase().includes(e.toLowerCase())) {
						 citizenship_filter = true;
					 }
				 });

				 // check for match on classLevel
				 filters.classLevel.forEach( e => {
					 if (row.values()['gradelevel'].toLowerCase().includes(e.toLowerCase())) {
						 class_level_filter = true;
					 }
				 });

				 // can only be truly false if they were checked tho -- if unchecked,
				 // that is if there are no terms in the category, it shouldn't flag false
				 // hence reset each sub-filter to true if it hasn't been checked (since,
			   // technically, if they haven't specified a sub-filter then ANY result in
			   // that sub-area will be acceptable.)

				 if (filters['country'].length <= 0) {
					 country_filter = true;
				 }

				 if (filters['fundSource'].length <= 0) {
				 	fund_source_filter = true;
				 }

				 if (filters['citizenship'].length <= 0) {
				 	citizenship_filter = true;
				 }

				 if (filters['classLevel'].length <= 0) {
				 	class_level_filter = true;
				 }

				 // return whether to filter this row or not
				 return (country_filter && fund_source_filter && citizenship_filter && class_level_filter);

			 });
		 } else {
			 awardList.filter();
		 }
	 });

	 /////////////////////////////////////////////////////////////////////////////
	 /////////////////////////////////////////////////////////////////////////////
	 /////////////////////////////////////////////////////////////////////////////
	 /////////////////////////////////////////////////////////////////////////////

	 // kay now writing all the tingz


}

window.addEventListener('DOMContentLoaded', init) // actually calls the tabletop code
