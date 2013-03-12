/*
 * File: app/view/ListContainer.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CityBars.view.ListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.listcontainer',

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'list',
                id: 'dataList',
                itemTpl: [
                    '<img class="photo" src="{photo_url}" width="40" height="40"/>{name}<br/><img src="{rating_img_url_small}"/>&nbsp;<small>{address1}</small>'
                ]
            }
        ]
    }

});