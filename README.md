# Display Sheets

## Basic About

Building a small wordpress plugin to port data in from a google sheet, display it nicely, and allow filtration by column. Test case is the scholarships page for my place of work. Eventually the plugin will be generalized (how this will look conceptually will be addressed at some point in the future).

## To Do

- [] Find a more robust way to pull this off.
 - _2018/09/05_ Need the simplicity of Google Sheets for non-technical users to edit the spreadsheet & don't want to build a whole other (ungeneralizable) mini-CMS just to plug back into wordpress. But also don't want to risk the whole project going offline if the API breaks. Maybe can use Tabletop to export the spreadsheet & cache that.

##Libraries explored or used

- [Tabletop.js](https://github.com/jsoma/tabletop)
- [jQuery](https://jquery.com/)
- [List JS](listjs.com) (to check out)

