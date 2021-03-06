if(Meteor.isClient){
  Template.hello.created = function(){
    this.maestro = MeteorMaestro;
  };

  Template.hello.rendered = function(){
    this.maestro.start();
    Tracker.autorun(function(){
      console.log('recomputing');
      var test = '';
      var timer = setInterval(function(){console.log('hey'); test = 'test'}, 1000);
    });
  };

  Template.hello.destroyed = function(){
    this.maestro.stop();
    delete this.maestro;
  };

  Template.hello.helpers({
    person: function(){ return Session.get('peep'); },
    mood: function(){ return 'IS ' + Template.instance().maestro.mood.get(); }
  });

  Template.hello.events({

  });

  var MeteorMaestro = (function(){
    var _peeps = ['Mete', 'Julz', 'Nakaz', 'Papa Bear', 'TOOOONNNYY', 'Chino'];
    var _moods = ['Angry', 'Happy', 'Sad Panda', 'Super'];
    var _currentMood = new ReactiveVar('Ambivalent');
    var peepInterval;

    function startGenerator(){
      peepInterval = setInterval(setRandomPeep, 1000);
    }

    function stopGenerator(){
      clearInterval(peepInterval); 
    } 

    function setRandomPeep(){
      Session.set('peep', getRandomPeep());
      _currentMood.set(getRandomMood());
    }

    function getRandomPeep(){
      return _peeps[Math.floor(Math.random() * _peeps.length)];
    }

    function getRandomMood(){
      return _moods[Math.floor(Math.random() * _moods.length)];
    }

    return {
      start: startGenerator,
      mood: _currentMood,
      stop: stopGenerator
    }
  })();
}