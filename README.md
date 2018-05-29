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

* `Vue`
* `Vuex`
* `Vue-router`