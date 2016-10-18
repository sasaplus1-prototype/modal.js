'use strict';

var EventEmitter = require('events').EventEmitter,
    inherits = require('inherits');

//------------------------------------------------------------------------------

var toString = Object.prototype.toString;

/**
 * check to value is function
 *
 * @param {*} value
 * @return {Boolean}
 */
function isFunction(value) {
  return (
    typeof value === 'function' || toString[call](value) === '[object Function]'
  );
}

/**
 * check to value is string
 *
 * @param {*} value
 * @return {Boolean}
 */
function isString(value) {
  return (
    typeof value === 'string' || toString.call(value) === '[object String]'
  );
}

//------------------------------------------------------------------------------

inherits(Modal, EventEmitter);

/**
 * Modal class
 *
 * @constructor
 */
function Modal() {
  // if forget `new`
  if (!(this instanceof Modal)) {
    return new Modal();
  }

  EventEmitter.call(this);

  // modal list
  this.modals = {};

  // showed stack for modal
  this.stack = [];
}

/**
 * append modal
 *
 * @param {String|Object} params
 */
Modal.prototype.append = function append(params) {
  var name, onShow, onHide;

  if (isString(params)) {
    name = params;
  } else {
    name = params.name;
  }

  onShow = (isFunction(params.onShow)) ? params.onShow : null;
  onHide = (isFunction(params.onHide)) ? params.onHide : null;

  (onShow !== null) && this.on(name + ':show', onShow);
  (onHide !== null) && this.on(name + ':hide', onHide);

  this.modals[name] = {
    name: name,
    onShow: onShow,
    onHide: onHide
  };
};

/**
 * remove appended modal
 *
 * @param {String} name
 */
Modal.prototype.remove = function remove(name) {
  var result = {},
      modals = this.modals,
      i, len, modal;

  for (i = 0, len = modals.length; i < len; ++i) {
    modal = modals[i];
     
    if (modal.name === name) {
      this.removeListener(name + ':show', modal.onShow);
      this.removeListener(name + ':hide', modal.onHide);
    } else {
      result[modal.name] = modal;
    }
  }

  this.modals = result;
};

/**
 * emit show modal event
 *
 * @param {String} name
 */
Modal.prototype.show = function show(name) {
  var modal = this.modals[name];

  if (!modal) {
    return;
  }

  this.emit(name + ':show');
  this.emit('show', name);

  this.stack.push(modal);
};

/**
 * emit hide modal event
 *
 * @param {String} name
 */
Modal.prototype.hide = function hide(name) {
  var modal = this.modals[name],
      i;

  if (!modal) {
    return;
  }

  i = this.stack.length - 1;

  while (i--) {
    if (this.stack[i].name === name) {
      this.stask.splice(i, 1);

      break;
    }
  }

  this.emit(name + ':hide');
  this.emit('hide', name);
};

//------------------------------------------------------------------------------

/**
 * alias
 */
Modal.Modal = Modal;

module.exports = Modal;
