# Scholarships

## Basic About

This is a small app to allow filtration and search of [CSEAS](http://www.cseashawaii.org) compiled (mainly Southeast Asia-focused) scholarships and fellowships (a re-do of the site's [scholarships page](http://www.cseashawaii.org/students/scholarships/)). It pulls in data from a Google Sheet of the scholarships, allowing for easy editing without touching code, and presents it in sortable/filterable form. See _Libraries Explored or Used_ for which JS libraries enable this.

## To Do


- [ ] Add case to handle multiple checkboxes in the same category(?) - might require some kind of global query tracker
- [ ] Add column for deadlines
- ~[ ] Sticky first column (award names) (maybe)~
- [ ] Add responsive sidebar to house checkbox filtration or other info
- [ ] Find a more robust way to pull this off.
	- _2018/09/05_ Need the simplicity of Google Sheets for non-technical users to edit the spreadsheet & don't want to build a whole other (ungeneralizable) mini-CMS just to plug back into wordpress. But also don't want to risk the whole project going offline if the API breaks. Maybe can use Tabletop to export the spreadsheet & cache that.

## Done
- [x] (2018-11-16) Create simple collapse pane toggle WITHOUT bootstrap - currently need BS4 but don't want to use it because it throws off page styling
	- Note: Used Semantic UI.
- [x] (2018-20-26) Make header row (and maybe search bar also) sticky
- [x] (2018-10-26) To save space, make the description & key toggle-able
- [x] (2018-10-26) Add checkbox filters (on certain columns only)
    - Removed some options (which were complex to implement) in the interest of completing this step
- [x] (2018-09-19) Add description to page & terminology key as in old/index.html
- [x] (2018-09-10) Add filtration system on scholarship award metadata
	- integrated Tabletop with Listjs to generate a table rather than writing custom templating. Fixes issue `2018/09/05` below. Filtering and sorting now work. This is currently being constructed in scratch.html/js/css (files to be consolidated later)

## Issues & Notes

- **RESOLVED BY PIVOT** ISSUE _2018/11/16_ Had a hell of a time with correcting content hiding using a default-visible collapsible sidebar by Semantic UI. The issue was that when the sidebar was visible (and scrolling enabled on the page while it was visible) it would push the right side of the content table off into the void. Could not figure out how to get these 260px of content back, so page-disabled/dimmed-while-sidebar-visible it had to be.

- ISSUE _2018/09/24_ Computing intersections of criteria terms by function `filter_by_checkbox()`. This function works by filtering by lists of strings to include or exclude. Works perfectly if the include criteria and the exclude criteria (if any) do not have matching substrings. However, there are some edge cases where we might want to filter by exclusion only (which doesn't work) OR where we want to exclude terms in some cases but not in others (e.g.: finding all 'graduate' awards but including term 'graduate' which also necessarily includes 'undergraduate'. However, sometimes the award matches both 'graduate' and 'undergraduate' and thus should not be excluded on the base of having the term 'undergraduate', because it's an award both grads and undergrads can apply for.)

- **RESOLVED** _2018/09/05_ Tried List.js with the JS-generated list of scholarship awards and it broke the page (lol). Could be because the awards are inserted into the DOM via JS & List.js refreshes the DOM somehow, but the scholarship list generator isn't called again. There's a way to construct a list in List.js so maybe this is the way to go, rather than the custom template currently used.

## Libraries & Frameworks

- [Tabletop.js](https://github.com/jsoma/tabletop) - read in google sheet data
- [List JS](listjs.com) - filtration, sorting, and template output
- [jQuery](https://jquery.com/)
- [BootStrap 4](https://getbootstrap.com/) - _may discontinue use_
- [Semantic UI](https://semantic-ui.com/) - responsive, collapsible sidebar
