import {o2, ro, rw} from './lib/o2.es';

@o2
class Foo {
  @ro name = 'Bob';
  @rw age;
  message () { return "Hello " + this.name }

  foo (x) { return "Hello" + x  }

//  @around foo (orig, x) { console.log(orig); orig(x + 'you are awesome') }
}

let name = "mst"; let age = 42;

console.log(Foo);

try { new Foo } catch (e) { console.log("Error: " + e) };

let foo = new Foo({ name, age });

let foo2 = new Foo({ age });

console.log(foo2.message());

console.log(foo);

console.log(foo.message());

foo2.age = 23;

console.log(foo2);

try { foo.name = 'Joe' } catch (e) { console.log("Error: " + e) };

console.log(foo.foo());
