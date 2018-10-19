# Vue-Config

## Purpose
This library is a replacement for several common Vue npm packages. The library 
is loaded in on all pages on our portals, which means that any Vue microservice 
on our portals can rely on these packes being there. This way we avoid the duplication 
of every microservice loading in the same npm packages.
 
Currently the library includes:

* vue
* vuex
* vue-Router
* vue-template-complier
* @studyportals/vue-multiselect

## Usage
First uninstall all dependencies which this packages provides:

```bash
npm uninstall @studyportals/vue-multiselect vue vue-router vue-template-compiler vuex
```

Then we simply replace these by this library:

```bash
npm install @studyportals/vue-config
```

Add the following plugin to your webpack configuration (for example in webpack.base.conf.js):

``` javascript
plugins: [
    new webpack.DllReferencePlugin({
        manifest: require("@studyportals/vue-config/dist/library.json")
    })
],
```

There is nothing more to do. Your Vue application will now use the packages provided by this package.
Once the dependencies are found, and resolved, they will be excluded from your bundle. Your bundle
file should now be significantly smaller!

## Common issues

### Place of webpack configuration in folder structure
The `library.json` file that is referenced relies on a certain folder structure to find its dependencies and exclude 
them from the main application file that it builds. It is therefore important that your webpack configuration is put
in the right place. *Make sure to put it one folder deeper than the root.* You could for instance create a `Build` folder
in the root of your application and put your webpack file there.

### Aliases
It is possible that your webpack configuration contains aliases, like so: 

```javascript
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
}
```
This might break the codesplitting and so far the working solution has been to simply remove the alias.

### no-extraneous-dependencies
Since we now load in this library as a dependency we no longer have Vuex as a direct dependency in our package.json file.
If your Eslint has the 'no-extraneous-dependencies' rule configured it will no longer let you build your project :(. The 
only solution we found until now is to turn off the rule by using the following setting:

```javascript
'import/no-extraneous-dependencies': 0,
```

### "But my application requires a package to run on a different version"

In that case, that specific package can be updated, but you **first** need to
**align with all the other teams that have a Vue application to re-deploy once the
version is changed**, to avoid any conflicts between applications that depend on
the same `vue-config`-based library file.


### How do I run my application standalone?
Open your main index.html file and add embed the pre-build library.
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@studyportals/vue-config/dist/library.min.js"></script>
```
_Production version_

You can also include the non minified version (which enables the Vue debugger). This is totally fine
as long as you make sure that the non minified version will never be embedded in production. _You shouldn't
even try to embed the library file on our portals since it is already loaded trough the CDN so you should be
fine ;-)_
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@studyportals/vue-config/dist/library.js"></script>
```
_Development version_

The vue-config library is by default loaded on every page. Loading this library multiple times will cause the page
to break. It is therefore important to exclude them! There are several ways to embed your resources on our portals. Most of them boil down to parsing the DOM, extracting the javascript and stylesheets and injecting them on the page.

Please see the following snippet which should help you excluding the library file from being injected.

``` javascript
/**
 * The CDN url of our Vue-Config package excluding the version number.
 * @type {string}
 */
const vueConfigCdnUrl = 'https://cdn.jsdelivr.net/npm/@studyportals/vue-config';

// Somewhere in the logic where you want to embed the javascript resource.
if(src.startsWith(vueConfigCdnUrl)){
    // Do not import
    return;
}
```

## How does it work?

This package is created with the [DLLPlugin](https://webpack.js.org/plugins/dll-plugin/).
A manifest is created on the side, which is used by the [DllReferencePlugin](https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin) to map dependencies.