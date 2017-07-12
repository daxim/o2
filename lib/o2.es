function o2 (orig) {
  if (!orig.prototype.hasOwnProperty('$o2$')) {
    return target;
  }
  let attrs = orig.prototype.$o2$.attrs;
  function o2constructor (args = {}) {
    if (attrs.required.length) {
      let missing = attrs.required.filter(name => !args.hasOwnProperty(name));
      if (missing.length) {
        throw "Missing required attributes: " + missing.join(', ');
      }
    }
//    orig.call(this, args);
    for (let { name, writable } of attrs.specs) {
      let value = (name in args ? args[name] : this[name]);
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: true,
        writable,
        value,
      });
    }
  }
  o2constructor.prototype = orig.prototype;
  Object.defineProperty(o2constructor, 'name', {
    writable: true,
    value: orig.name
  });
  return o2constructor;
}

function ro (...args) {
  return attr(...args, false);
}

function rw (...args) {
  return attr(...args, true);
}

function attr (target, key, descriptor, writable) {
  if (!target.hasOwnProperty('$o2$')) {
    target.$o2$ = { attrs: { specs: [], required : [] } };
  }
  let attrs = target.$o2$.attrs;
  attrs.specs.push({
    name: key,
    writable
  });
  if (!descriptor.initializer) {
    attrs.required.push(key);
  }
  // When I annotate a property without a default value, writable ends up
  // defaulting to false. [tableflip]
  return {
    ...descriptor,
    writable: true,
  };
}

export {o2, ro, rw};
