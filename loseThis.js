var Q = require('q');

// a person always sing and walk
// first, a person is given a name
// he wants to sing but it takes a bit of time to recognize it
// after he starts singing, he also start walking
var Person = function (name) {
  var name = name,
      song = new Song(), // the song this person knows

      walk = function () {
        var self = this;
        console.log('yes, I am walking now, and `this` at walk: ', this);
        setTimeout(function () {
          console.log('`this` in timeout callback: ', this)
        }, 500)
      },

      sing = function () {
        console.log('`this` when sing: ', this);
        var self = this;
        song.getName().then(function (name) {
          console.log('this in defer callback: ', this.constructor);
          console.log('I am singing ', name);
          console.log('can I walk here?');
          walk.call(self); // yes
          console.log('can I recognize my name here?')
          console.log('not with "this", this.name = ', this.name);
          console.log('neither with "self", self.name = ', self.name);
          console.log('because it\'s not expose outside of class');
          console.log('actually if "name" isn\'t being overwritten, I can get it with *name*');
          console.log('also I can get it from a method.');
          console.log('cool, my name is', self.getName());
        })
      },

      getName = function () {
        return name;
      }

  return {
    walk: walk,
    sing: sing,
    getName: getName
  }
}

var Song = function () {
  var name = 'my song',

      getName = function () {
        deferred = Q.defer();
        setTimeout(function () {
          deferred.resolve(name);
        }, 1000)
        return deferred.promise;
      }

  return {
    getName: getName
  }
}

var me = new Person('Jesse');
me.sing();

