# Build Your First Mobile App


This guide shows you how to build an example app, called CityBars. CityBars is a Sencha Touch app that helps users find local watering holes. Download the .xda file for the [completed project](https://github.com/SenchaArchitect/CityBars#readme) along with its accompanying [CSS file](https://github.com/downloads/SenchaArchitect/CityBars/citybars.css). They are part of the examples released with Architect.

Before we get started, a couple of important points:

 - For the app to load data, you need to insert your own [Yelp](http://www.yelp.com/developers/getting_started/api_overview) key. See "The controller" section below for more details.
 - Parts of the app aren't complete. For example, two buttons ("Call" and "More") are added to the app UI but aren't wired to any functionality. The app is provided for the purposes of helping you learn your way around Architect. You're invited to build out the app further -- and, if you do, share your results by posting them to the [Architect forum](http://www.sencha.com/forum/forumdisplay.php?98-Sencha-Architect-2.x-Help-amp-Discussions).

### Preliminary steps
Before using this guide, do the following:

- Download and open [Architect](http://www.sencha.com/products/architect) to a Sencha Touch project.
- Be sure to have a local web server available at `http://localhost/` so you can run the application. If you need help installing or configuring a server, see the [Sencha Quick Start guides](http://www.sencha.com/learn/sencha-touch-quick-start/).

### Project setup

Save the project to a folder called `citybars` in your local host directory.

In the Edit menu, select Project Settings... Edit the URL Prefix field to point to the citybars folder you just created. It should contain a URL that looks something like `http://localhost/myprojects/citybars`, depending on how you've set up your local web server. Be sure you do this carefully, or your project will not save correctly or run in a browser.

### Build the UI with views
Start by building the visual UI of the citybars application. Specifically we'll be creating a main view, list view, and detail view.

#### Application

In Config, set the following:
- **name:** CityBars

#### Main navigation view

Add a Navigation view to the project.  In Config, set the following:

 - **userAlias:** mainnav
 - **userClassName:** MainNav

Be sure to save your work regularly.

#### List view

1. Add a Container to the project as a top-level component. Set the following configs:

 - **userAlias:** `listcontainer`
 - **userClassName:** `ListContainer`
 - **layout:** `fit`

2. Add a List as a child of the container (`ListContainer`) you just created. Set the following configs for List:

 - **id:** `dataList`
 - **itemTpl:**
    `<img class="photo" src="{photo_url}" width="40" height="40"/>{name}<br/><img src="{rating_img_url_small}"/>&nbsp;<small>{address1}</small>`

3. Create a linked instance of the container (`ListContainer`) by dragging it onto the MainNav view in the Inspector and selecting the Link option from the Copy Component dialog box that appears. The Inspector shows the container under MainNav as follows:

{@img first_mobile1.png}

4. Select the linked instance of the container (`MyContainer1`) under MainNav and set the following configs:

 - **title:** `City Bars`

#### Detail view

1. Add a Tab Panel as a top-level component and set the following configs:

 - **userAlias:** `detailpanel`
 - **userClassName:** `DetailPanel`

2. Find the Tab Bar Config property in Config and add a tab bar under the tab panel (`DetailPanel`) by clicking the add button ("+"). Move the tab bar above the three tabs by right-clicking it in the Inspector and selecting Move Up three times. Set the following configs on Tab Bar:

 - **pack:** `center`
 - **docked:** `top`
 - **ui:** `light`

**Contact tab**

Select Tab 1 in the Inspector. Note that this is a container (`Ext.Container`). Set the following configs:

 - **id:** `contact`
 - **title:** `Contact`

In the Inspector, drag Tab 2 and Tab 3 into the `contact` container to make them children of `contact`.  We are simply resuing containers that otherwise would be deleted and re-added. The Inspector should look like this:

{@img first_mobile2.png}

Select `MyContainer3` in the Inspector and set the following configs:

 - **id:** `info`
 - **layout:** `hbox`
 - **padding:** `10`
 - **tpl:**
`<img class="photo" src="{photo_url}" width="100" height="100"/>;<h2>{name}</h2><div class="info">{address1}<br/><imm src="{rating_img_url_sall}"/></div>`

Add a Component as a child of `info` (note that it is added as `MyComponent` in the Inspector) and set these configs:

 - **id:** `photo`
 - **height:** `100`
 - **width:** `100`
 - **tpl:** `<img class="photo" src="{photo_url}" width="100" height="100"/>`

Add a second Component as a child of `info` and set the following configs:

 - **id:** `data`
 - **padding:** `10`
 - **tpl:** `<h2>{name}</h2><div class="info">{address1}<br/><img src="{rating_img_url_small}"/></div>`

Select 'MyContainer4' under the `contact` container and set the following configs:

 - **layout:** `hbox`
 - **pack:** `center`

Add a Button to the container you just added and set the button's configs as follows:

 - **text:** `Call`
 - **width:** `100`

Add a Spacer to the just-added container and set the spacer's **width** config to `57`.

Add another Button to the just-added container and set the button's configs as follows:

 - **text:** `More`
 - **width:** 100


**Map Tab**

Add a Map to the `DetailPanel` sibling to contact and set these configs:

 - **id:** `detailMap`
 - **title:** `Map`
 - **height:** Be sure this remains unset.

Save your project.

### The model

Add a Model, and set its **userClassName** config to `Business`

Add 12 fields to the model and name them as follows:

 1. `id`
 2. `name`
 3. `latitude`
 4. `longitude`
 5. `address1`
 6. `address2`
 7. `address3`
 8. `phone`
 9. `state_code`
 10. `mobile_url`
 11. `rating_img_url_small`
 12. `photo_url`

### The store

Add a JsonPStore and set its configs as follow:

 - **userClassName:** `BusinessStore`
 - **storeId:** `BusinessStore`
 - **model:** `Business`. (Note that this associates the store with the model that was just added.)

Select `MyJsonReader` in the Inspector and set its **rootProperty** config to `businesses`.

### The controller

Add a controller and set its **userClassName** to `Business`. Then add an init function, double-click it in the Inspector to open the code editor, and insert the following code:

    var me = this;
    Ext.Viewport.setMasked({ message: 'Loading...' });
    // get the location...
    me.getLocation(function (location) {
        // then use Yelp to get the businesses
        me.getBusinesses(location, function (store) {
            // then bind data to list and show it
            me.getDataList().setStore(store);
            Ext.Viewport.setMasked(false);
        });
    });

See the comments for an explanation of what the code does.

Next, add four controller references. In Config, find the References property. Click the add button on the right under Value ("+") to add the first controller reference. When prompted name it `dataList` and set its selector to `#dataList`. Add three additional controller references using the same technique, as follows:

 2. Name the second reference `listCard` and set its selector to #`listCard`.
 3. Name the third reference `mainNav` and set its selector to `mainnav`.
 4. Name the fourth reference `detailCard` and set its selector to `#detailCard`.

Add a function to the controller and set its configs as follows:

 - **fn:** `getLocation`
 - **params:** `callback`

Double-click the function in the Inspector, and insert the following code into the code editor:

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            callback(position);
        }, function(error) {
            // give a warning for error
        });
    }

Add another function and set configs:

 - **fn:** `getBusinesses`
 - **params:** `location, callback`

Double-click the `getBusinesses` function in the Inspector, and insert the following code into the code editor, which obtains data for the app from Yelp:

    var store = Ext.data.StoreManager.lookup('BusinessStore'),
        yelpKey = '', // enter your yelp key here
        url = 'http://api.yelp.com/business_review_search' +
        '?ywsid=' + yelpKey +
        '&term=Bars' +
        '&lat=' + location.coords.latitude +
        '&long=' + location.coords.longitude;
    store.getProxy().setUrl(url);
    store.load(function() {
        callback(store);
    });

Note that you need to use your own Yelp key, available by registering (for free) with [Yelp](http://www.yelp.com/developers/getting_started/api_overview). In this example, we use the Review Search API v1.0.

Now complete the controller by adding a controller action to it. Add the action in Config, choosing Ext.dataview.List for the target type and `itemtap` for the event.

 - **controlQuery:** `#dataList`
 - **fn:** `onListItemTap`

Double click the action (`itemtap onListItemTap`) in the Inspector to open the code editor and add the following code:

    var me = this,
            map,
            lat,
            long,
            loc,
            marker,
            info, details;

    if (record) {

        details = Ext.create('CityBars.view.DetailPanel', {
            title: 'Details'
        });

        // set the map
        map = details.child('#detailMap');
        lat = record.get('latitude');
        long = record.get('longitude');

        map.setMapOptions({
            zoom: 18
        });
        map.setMapCenter({
            latitude: lat,
            longitude: long
        });

        // set the info
        info = details.child('#contact').child('#info');
        info.child('#photo').setData(record.data);
        info.child('#data').setData(record.data);

        me.getMainNav().push(details);
    }

### Add a style sheet

To improve the look of the app, giving it an attractive grey theme, you need to add a style sheet. To do this, in the Inspector, click the add button ("+") and choose Resource-->CSS Resource. The Resources node will display a new css resource, as shown here:

{@img first_mobile3.png}

Select it there and set its **url** config to `citybars.css`.

Download and unzip the [citybars.css](https://github.com/downloads/SenchaArchitect/CityBars/citybars.css). Place `citybars.css` file in the `citybars` folder you set up at the beginning of the project to store your app. Optionally, you can create a styles directory within the folder and set the url config to `styles/styles.css`.

### Final steps

View the application in the Inspector and be sure it now has the following:

 - Models: Business
 - Store: BusinessStore
 - Views: MainNav, ListContainer, DetailPanel

### Have a look at your hard work

Save your project one last time. Now point a web server to the application's location and open the app.html file for it. Here's what it should look like.

{@img first_mobile4.png}

You can also deploy the project to a hosted location and view it there. You can then navigate using your browser to view the application. Chrome should work fine, or view it through a WebKit browser on a mobile device.

### Files for this article

 - [Completed project files](https://github.com/downloads/SenchaArchitect/CityBars/citybars442.xda). (**Note.** For the app to load data, you need to insert your own [Yelp](http://www.yelp.com/developers/getting_started/api_overview) key.)
 - [CSS file](https://github.com/downloads/SenchaArchitect/CityBars/citybars.css)

### What's next

Now that you've seen how to build a mobile app using Architect, you're invited to build out the app further. Take it's incomplete parts and finish them. Or add your own inspiration to provide additional cool features. If you do, please share your results with us and the community by posting them to the [Architect forum](http://www.sencha.com/forum/forumdisplay.php?98-Sencha-Architect-2.x-Help-amp-Discussions). We're fascinated to see what you can do.