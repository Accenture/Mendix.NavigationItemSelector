## NavigationItemSelector
Mendix plugable widget that marks navigation item as active based on menu name and current page's javascript event. This widget allows also overriding menu items selection styles. You can find more in #Usage section

## About
This widget was created to help handling with navigating to a page in other way that through navigation menu e.g. button, deep link etc.

## Usage
Place the widget on your laybout, containing navigation menu widget. 
-Insert the name of menu component e.g. "navigationTree3", "menuBar1"
-Insert your styles for selected item or leave default configuration.

On every page that can be accessed through navigation of your app insert jaascript code:
$(document).ready(function(){
    var event  = new CustomEvent('menuTrigger', {detail: "<YOUR NAVIGATION ITEM CAPTION>"});
    document.dispatchEvent(event);
});
  
I recommend using widget Javascript Snippet from appstore: https://appstore.home.mendix.com/link/app/43096 using jQuerry without refreshing.
