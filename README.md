# Vue-Config

**A library that includes all the vue-related packages that most Vue applications
will use.** As a result the libraries in this package can be shared by multiple
Vue applications on the same page. By letting them use this library, it is
ensured that the packages run on the same version.

## "But my application requires a package to run on a different version"

In that case, that specific package can be updated, but you **first** need to 
**align with all the other teams that have a Vue application to re-deploy once the
version is changed**, to avoid any conflicts between applications that depend on
the same `vue-config`-based library file.

## "But my application does not make use of a shared library file"

For now we're experimenting with how difficult it would be to keep the packages of
several microservices run on the same versions. That's why **for now we want all
Vue applications to run on the same version of:**

* `Vue`: 2.5.16
* `Vuex`: 2.8.1
* `Vue-router`: 2.8.1 (version 3.0.1 was causing issues on iOS 10)
* `Vue-template-compiler`: 2.5.16 (should run on same version as Vue)

## How to use this package

Remove `vue`, `vuex`, `vue-router` and `vue-template-compiler` from your package.json
(if they were included in the first place). Instead, run `npm install @studyportals/vue-config`. 
Try to run your application to see if it still works. If not, check in your 
`package-lock.json` whether the packages that `vue-config` should take care off
are all included.

### Webpack

If you make use of webpack in your building process, the module object inside should 
also include the following:

``` javascript
module: {
	resolve: {
        alias: {
            'vue$': determineAlias('vue'),
            'vuex$': determineAlias('vuex'),
            'vue-router$': determineAlias('vue-router')
        }
    }
}
```

If you make use of code splitting, both webpack configuration files should include
the list of aliases that is shown above. The `determineAlias` function should be
accessible in the same file and should have contents like this:

``` javascript
exports.determineAlias = function(name){
    
    // Default, not minified.
    let alias = `${name}/dist/${name}.common.js`;
    
    // Only if we are in production environment, take the minified version.
    if(JSON.stringify(process.env.NODE_ENV) === "production"){
    
        alias = `${name}/dist/${name}.min.js`;
    }

    return alias;
};
```