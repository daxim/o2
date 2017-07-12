import tap from 'tap';
import {o2, ro, rw} from '../lib/o2.es';
import util from 'util';

tap.ok(o2, 'module exports');

@o2
class Foo {
  @ro name = 'Bob';
  @rw age;
  message () { return "Hello " + this.name }

  foo (x) { return "Hello" + x  }

//  @around foo (orig, x) { console.log(orig); orig(x + 'you are awesome') }
}

tap.pass('class decorates');

let name = "mst"; let age = 42;

console.log(Foo);
tap.is(
    util.inspect(Foo).indexOf('[Function: Foo]'),
    0,
    'stringifies to orig class name'
);

try { new Foo } catch (e) { console.log("Error: " + e) };
tap.throws(
    () => new Foo,
    'Missing required attributes: age',
    'missing required attr throws'
);

let foo = new Foo({ name, age });
tap.ok(foo, 'passing all attrs');

let foo2 = new Foo({ age });
tap.ok(foo2, 'passing required attrs');

console.log(foo2.message());
tap.is(foo2.message(), 'Hello Bob', 'default value for attr');

console.log(foo);

console.log(foo.message());
tap.is(foo.message(), 'Hello mst', 'attr used in method');

tap.is(foo2.age, 42, 'read accessor');
foo2.age = 23;
tap.is(foo2.age, 23, 'write accessor');

console.log(foo2);

try { foo.name = 'Joe' } catch (e) { console.log("Error: " + e) };
tap.throws(
    () => {foo.name = 'Joe'},
    'write ro attr throws'
);

console.log(foo.foo());
tap.is(foo.foo(), 'Hello undefined', 'no method argument');

tap.end();
