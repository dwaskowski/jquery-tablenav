jQuery-TableNav
=================

A jQuery utility plugin providing navigation with arrow keys in a table with
input fields.

It's created with Coffeescript since it's fun and efficient to work with!

##Why this plugin?
You know the way you can navigate between cells in those spreadsheets apps? It's
nice to have something like that as well in your HTML tables. 

##Installing
Grab one of the two files from dist/ in the repository and make sure you 
insert the following line in you HTML document. Insert jquery.tablenav.js
_after_ the jQuery script:

```html
<script src="jquery.tablenav.js"></script>
```
##Usage
```javascript
$('#my-awesome-table').tableNav();
```

That's all! Now you can use your arrow keys to navigate between the enabled
input fields in the table.

##Example

Check out this [live](http://www.invetek.nl/samples/tablenav) sample (and its [source](sample)).
