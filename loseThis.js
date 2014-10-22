var Q = require('q');

var Person = function (name) {
  var name = name,
      song = new Song(),

      walk = function () {
        var self = this;
        console.log('yes, I am walking now, and `this` at walk: ', this);
        setTimeout(function () {
          console.log('`this` in timeout callback: ', this)
        }.bind(self), 500)
      },

      sing = function () {
        console.log('`this` when sing: ', this);
        var self = this;
        song.getName().then(function (name) {
          console.log('I am singing ', name);
          console.log('can I walk here?');
          walk.call(self); // yes
          console.log('can I recognize my name here?')
          if (self.name !== undefined && self.name !== null) {
            console.log('yes! my name is ', self.name);
          } else {
            console.log('no.. I don\'t know my name. Is it', self.name);
          }
          console.log('maybe I can get it from a method.');
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

