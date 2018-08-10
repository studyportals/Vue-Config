module.exports = {
    Vue: require('vue').default,
    VueRouter: require('vue-router').default,
    Vuex: require('vuex').default,
    VueTemplateCompiler: require('vue-template-compiler'),
    VueMultiselect: require('@studyportals/vue-multiselect'),
    determineAlias: function(name){
        // Default, not minified.
        let alias = `${name}/dist/${name}.common.js`;

        // Only if we are in production environment, take the minified version.
        if(JSON.stringify(process.env.NODE_ENV) === "production"){

            alias = `${name}/dist/${name}.min.js`;
        }

        return alias;
    }
}
