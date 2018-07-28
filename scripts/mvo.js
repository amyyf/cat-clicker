(function() {
  const model = {
    // add a cat from octopus
    catList: [],
    addCat: function (cat) {
      this.catList.push(cat);
    },
    // give a cat to octopus
    getCat: function (catId) {
      return this.catList[catId];
    },
    // give all cats to octopus
    init: function () {
      console.log('model initialized');
    }
  }

  const octopus = {
    // create new cat and give to model
    newCat: function (name, photo, description) {
      model.addCat({name: name,
        photo: photo,
        description: description,
        clicks: 0
      });
    },
    // countClicks function gives clicks to model and to view

    // gives cat data to view - catlist

    // kicks off view and model
    init: function () {
      model.init();
      view.init();
    }
  }

  const view = {
    // render default cat
    init: function () {
      console.log('view initialized');
    },
    // select cat through catlist

    // render selected cat
  }

  octopus.newCat('Rey', 'img/calicocat.png', 'calico');
  octopus.init();
})();
