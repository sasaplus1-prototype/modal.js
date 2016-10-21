# modal.js

control modal

## Installation

```sh
$ npm install sasaplus1-prototype/modal.js
```

## Usage

via `require()`

```js
var modal = require('modal');
```

via `<script>`

```html
<script src="modal.min.js"></script>
```

### Example

```js
var modals = new Modal();

modals.on('show', function(name) {
  console.log('show ' + name + ' modal');
  jQuery('#overlay').fadeIn();
});
modals.on('hide', function(name) {
  console.log('hide ' + name + ' modal');
  jQuery('#overlay').fadeOut();
});

modals.append({
  name: 'info',
  onShow: function() {
    jQuery('#modal-info').fadeIn();
  },
  onHide: function() {
    jQuery('#modal-info').fadeOut();
  }
});

jQuery('#button-modal-open').on('click', function() {
  modals.show('info');
});
jQuery('#button-modal-close').on('click', function() {
  modals.hide('info');
});
```

## Functions

### Modal()

`Modal` class constructor. it inherited `EventEmitter`.

### Modal.Modal()

alias of constructor.

### Modal#modals

`Object`

object for modals data. key uses as modal name.

### Modal#stack

`Array`

stack for showed modals.

### Modal#append(params)

- `params`
  - `String|Object`

- `params.name`
  - `String`
- `[params.onShow]`
  - `Function`
- `[params.onHide]`
  - `Function`

append modal data.

`params` uses as `params.name` if it is String.

### Modal#remove(name)

- `name`
  - `String`

remove modal data. new `modals` object assign to `Modal#modals`.

### Modal#show(name)

- `name`
  - `String`

emit show event.

1. call `onShow` of modal.
2. emit `show` with modal name.

### Modal#hide(name)

- `name`
  - `String`

emit hide event.

1. call `onHide` of modal.
2. emit `hide` with modal name.

## License

The MIT license. Please see LICENSE file.
