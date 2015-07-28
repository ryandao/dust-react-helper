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


**Thanks [@wirehead](https://github.com/wirehead) for the great contribution!**
