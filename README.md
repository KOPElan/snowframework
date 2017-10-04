# SNOWF
a simple nodeJS web framework

## get start
1. npm install snowframework --save
1. create appsetting.json in root dir, refer to following example
1. create following dir: controller, views, wwwroot
1. create new controller in controller dir and create new index.html in views dir
1. cteate index.js in root dir, refer to following example
1. excute node index.js

## index.js example

``` js
//require snowframework
const snowf = require('snowframework');
const appsetting = require('./appsetting');

//init with appsetting.json
var app = snowf(appsetting.snowf);
//add controller
app.addController('home', require('./controllers/homeController'));
app.addController('docs', require('./controllers/docsController'));
//start app
app.start();
```

## appsetting.json example
this file need snowf node
```json
{
    "snowf": {
        "environment": "development", 
        "port": "8089",
        "router": {
            "default": "home", 
            "error": "/shared/error.html", 
            "views": "./views", 
            "layout": "./views/shared",
            "root": "./wwwroot" 
        }
    }
}
```
environment : set the environment, if 'development', you will recive the debug info, else it will show the custom error page

port : the server port

default : default page

error : custom error page

views : views dir

root : static resouce dir
