# Vue-Config

**This library that includes all the vue-related packages that most Vue applications
will use.** As a result the libraries in this package can be shared across multiple
Vue applications on the same page. By letting them use this library, it is
ensured that the packages run on the same version. Your app bundle does not
need to include these libraries anymore since it's loaded on the portals through a
CDN.

## Install this package.
First uninstall all dependencies which this packages provides, the next step is to
install this package. There is nothing more to do. You Vue application
will now use the packages provided by this package.
```bash
npm uninstall @studyportals/vue-multiselect vue vue-router vue-template-compiler vuex
npm install @studyportals/vue-config
```

## Exclude these packages from you library bundle.
It is important to exclude this package from your library so we do not include it multiple
times on our portals.

This package is created with the [DLLPlugin](https://webpack.js.org/plugins/dll-plugin/).
A manifest is created on the side, which is used by the [DllReferencePlugin](https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin) to map dependencies.

### Add DllReferencePlugin
Add this plugin to your webpack configuration.
``` javascript
{
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require("@studyportals/vue-config/dist/library.json")
        })
    ],
}
```

### Place of webpack configuration in folder structure
The `library.json` file that is referenced relies on a certain folder structure to find its dependencies and exclude 
them from the main application file that it builds. It is therefore important that your webpack configuration is put
in the right place. *Make sure to put it one folder deeper than the root.* You could for instance create a `Build` folder
in the root of your application and put your webpack file there.

### Load @studyportals/vue-config from our CDN.
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


### Build your project
Once the dependencies are found, and resolved, they will be excluded from your bundle. Your bundle
file should now be significantly smaller!

## Make sure you do not include the library file on our portal.
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

## "But my application requires a package to run on a different version"

In that case, that specific package can be updated, but you **first** need to
**align with all the other teams that have a Vue application to re-deploy once the
version is changed**, to avoid any conflicts between applications that depend on
the same `vue-config`-based library file.
