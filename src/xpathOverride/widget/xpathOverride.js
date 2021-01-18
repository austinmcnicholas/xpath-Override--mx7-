import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';

import registry from 'dijit/registry';

export default defineWidget('xpathOverride', false, {

    _obj: null,


    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);

        const queryName = 'mx-name-' + this.key;
        const domList = document.getElementsByClassName(queryName);
        console.log(domList);
       
        for (const element of domList) {
                
            const node = registry.byNode(element);
            
            if (node && !node._destroyed){ 
                this.grid = node;
            }


            };
        
        //this.grid = registry.byNode(domList[domList.length - 1]);

    },

    update(obj, callback) {

        const xpath = obj.get(this.attr);
        let datasource;

        
        if (this.datagrid){
            datasource = this.grid._dataSource;

            if (datasource){
                datasource.setConstraints(xpath);
                this.grid.update();
            } else {
                console.log("grid datasource is empty");
            }
                

        } else {
            datasource = this.grid._datasource;
            if (datasource){
                datasource._staticConstraints = xpath;
                this.grid.update();
            } else {
                console.log("grid datasource is empty");
            }

        } 
        
            console.log('datasource is empty');
        

        if(callback) {callback();}
    },
});
