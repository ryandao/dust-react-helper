## dust-react-helper

A convenient helper for server-side rendering React components from within DustJS templates. At the moment it's only tested with the Linkedin version of Dust.

### Installation

    npm install dust-react-helper

And just need to set it up with:

    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust);

### Usage

The module registers a new `react` helper. You can call it directly in your Dust template like so:

    {@react component="./react/my_component" /}

The component path is relative to the directory where you run your node server. There's also a way to set the React component directory globally:

    var helper = require('dust-react-helper');
    helper.setReactDir('react');

And then the helper will pick up components relative to the configured react directory:

    {@react component="my_component" /}

If you want to pass some paramaters to the component:

    {@react component="my_component" paramStyle=param immStyle="spoon" intStyle="{fork}" component="param_component" /}

### Using .jsx instead of .js or Harmony for your components

When you install dust-react-helper, the first paramater is passed to the jsx
compiler, so it you want to use .jsx you can install it with these paramaters:

    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust, {extension: '.jsx'});

And then inside of your Dust template:

    {@react component="./react/my_component.jsx" /}

Similarly, if you want to use [ES6 transforms](https://github.com/facebook/jstransform/tree/master/visitors) 
    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust, {harmony: true});

### Internal cache

`React.renderToString` is slow compared to the rest of Dust.  dust-react-helper 
contains an internal cache to store pre-transformed versions of the helper nodes
using [Memoizee](https://www.npmjs.com/package/memoizee).

You can pass the paramaters when you install dust-react-helper:

    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust, undefined, {max: 2000});

`{ max: 2000, primitive: true }` will set the maximum number of cached jsx nodes to 2000.
`{ maxAge: 1000, primitive: true }` will set the maximum age to 1000 ms (one second)

The `primitive: true` tells the cache to generate a hash out of the properties.  This makes the code several thousand percent faster.

You can clear the internal cache like this:

    var dust = require('dustjs-linkedin');
    var helper = require('dust-react-helper');
    helper.install(dust, undefined, {max: 2000});
    helper.clearCache();
