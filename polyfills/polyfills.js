/**
 * For more information on how babel is polyfilling these things, please refer to this documentation here.
 * https://babeljs.io/docs/en/babel-plugin-transform-runtime#helper-aliasing
 * 
 * Or see Here https://github.com/zloirock/core-js#babelruntime
 *
 * 
 * TL:DR In short, babel can polyfill anything that would normally pollute the global namespace, 
 * However instance methods like includes on string, need to be manually polyfilled
 */

/*
Things that ARE POLYFILLED automatically and tested in IE 11
--- Promises
--- new Map(${iterable})
--- async/await
--- 
 */

/*
Currently NOT POLYFILLED Or supported by core-js
!!! fetch
 */


/*  We can import our required polyfills using core-js
    If you require a functionality to be polyfilled for the website, here is where you would import it. USE core-js.
    For documentation on all of the polyfills, please refer here
*/ 
/**
 * https://github.com/zloirock/core-js
*/

// Example Polyfills

import 'core-js/fn/string/includes';
// import 'core-js/fn/string/repeat';
// import 'core-js/fn/string/pad-end';
// import 'core-js/fn/array/includes';
