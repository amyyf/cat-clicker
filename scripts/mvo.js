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
    countClicks: function (cat) {
      let count = cat.clicks;
      count++;
      cat.clicks = count;
      view.updateClicks(count);
    },

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
      this.catArea = document.getElementById('cat-area');
      console.log('view initialized');
    },
    // render catlist


    // render selected cat
    renderCat: function (cat) {
      const section = document.createElement('section');
      section.classList.add('cat');
      section.innerHTML = `
        <h3>${cat.name}</h3>
        <p>Number of clicks: <span id="click-counter">${cat.clicks}</span></p>
        <img src='${cat.photo}' alt='${cat.description} cat' id='${cat.description}-cat' />
      `;
      this.catArea.appendChild(section);
      this.catArea.addEventListener('click', function (e) {
        octopus.countClicks(cat);
      });
    },
    updateClicks: function (count) {
        const clickCounter = document.getElementById('click-counter');
        clickCounter.textContent = count;
    }

  }
  octopus.init();

  octopus.newCat('Rey', 'img/calicocat.png', 'calico');
  view.renderCat(model.catList[0])
})();
