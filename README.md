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

### Add aliases
This package provides the minified versions on production and the non-minified versions for
development. This is to support the Vue debugger while developing. Your package probably just
includes vue, vuex etc directly (`require('vue')`). The [DllReferencePlugin](https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin)
can not match those packages with the ones exposed from this package. In order to include the
exact same files you need to setup aliased in your webpack configuration for those packages.
The `determineAlias` method is a helper function exposed from this package.

``` javascript
const determineAlias = require('@studyportals/vue-config').determineAlias;

{
    resolve: {
        alias: {
            'vue$': determineAlias('vue'),
            'vuex$': determineAlias('vuex'),
            'vue-router$': determineAlias('vue-router'),
        }
    }
}
```

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

Once the dependencies are found, and resolved, they will be excluded from your bundle. Your bundle
file should now be significantly smaller!

### Load @studyportals/vue-config from our CDN.
Open your main index.html file and add embed the pre-build library.
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@studyportals/vue-config/dist/library.min.js"></script>
```

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
* `@studyportals/vue-multiselect`: ^2.1.1

## How to use this package

### Webpack

If you make use of webpack in your building process, the module object inside should
also include the following:

``` javascript
const VueConfig = require(@studyportals/vue-config);

module: {
	resolve: {
        alias: {
            'vue$': VueConfig.determineAlias('vue'),
            'vuex$': VueConfig.determineAlias('vuex'),
            'vue-router$': VueConfig.determineAlias('vue-router')
        }
    }
}
```
