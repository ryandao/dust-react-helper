## dust-react-helper

A convenient helper for server-side rendering React components from within DustJS templates. At the moment it's only tested with the Linkedin version of Dust.

### Installation

    npm install dust-react-helper

And just need to set it up with:

    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust);

If you're using JSX syntax without prior compilation, include [`babel` Require Hook](https://babeljs.io/docs/usage/require) or [node-jsx](https://github.com/petehunt/node-jsx) before installing the helper:

    require('babel/register'); // or
    require('node-jsx').install()

### Usage

The module registers a new `@react` helper. You can call it directly in your Dust template like so:

    {@react component="./react/my_component" /}

The component path is relative to the directory where you run your node server. There's also a way to set the React component directory globally:

    var helper = require('dust-react-helper');
    helper.setReactDir('react');

And then the helper will pick up components relative to the configured react directory:

    {@react component="my_component" /}

If you want to pass some paramaters to the component:

    {@react component="my_component" param1=param1 param2="spoon" param3="{param3}" component="param_component" /}

### Internal cache

`React.renderToString` is slow compared to the rest of Dust.  dust-react-helper
contains an internal cache to store pre-transformed versions of the helper nodes
using [Memoizee](https://www.npmjs.com/package/memoizee).

You can pass the paramaters when you install dust-react-helper:

    var dust = require('dustjs-linkedin');
    require('dust-react-helper').install(dust, undefined, {max: 2000});

`{ max: 2000, primitive: true }` will set the maximum number of cached jsx nodes to 2000.
`{ maxAge: 1000, primitive: true }` will set the maximum age to 1000 ms (one second)

You can clear the internal cache like this:

    var dust = require('dustjs-linkedin');
    var helper = require('dust-react-helper');
    helper.install(dust, undefined, {max: 2000});
    helper.clearCache();

=======
The `primitive: true` tells the cache to generate a hash out of the properties.  If you are sending large JSON objects as paramaters, the cache can get confused.  If you remove that, it's about as fast as no cache at all.  You can locally remove the cache (useful if you are generating forms on the server side) with noCache=true inside of the dust helper like this:

    {@react component="./react/my_component.jsx" noCache=true /}

**Thanks [@wirehead](https://github.com/wirehead) for the great contribution!**
