# Display Sheets

## Basic About

Building a small wordpress plugin to port data in from a google sheet, display it nicely, and allow filtration by column. Test case is the scholarships page for my place of work. Eventually the plugin will be generalized (how this will look conceptually will be addressed at some point in the future).

## To Do

- [] Add filtration system on scholarship award metadata
- [] Find a more robust way to pull this off.
	- _2018/09/05_ Need the simplicity of Google Sheets for non-technical users to edit the spreadsheet & don't want to build a whole other (ungeneralizable) mini-CMS just to plug back into wordpress. But also don't want to risk the whole project going offline if the API breaks. Maybe can use Tabletop to export the spreadsheet & cache that.

## Done

- [x] 2018-09-10 - integrated Tabletop with Listjs to generate a table rather than writing custom templating. Fixes issue `2018/09/05` below. Filtering and sorting now work. This is currently being constructed in scratch.html/js/css (files to be consolidated later)

## Notes

- _2018/09/05_ Tried List.js with the JS-generated list of scholarship awards and it broke the page (lol). Could be because the awards are inserted into the DOM via JS & List.js refreshes the DOM somehow, but the scholarship list generator isn't called again. There's a way to construct a list in List.js so maybe this is the way to go, rather than the custom template currently used.

## Libraries explored or used

- [Tabletop.js](https://github.com/jsoma/tabletop)
- [jQuery](https://jquery.com/)
- [List JS](listjs.com) (to check out)

