(function() {
  const model = {
    catList: [],
    /* receives catArray from octopus, populates catList data structure as an array of objects, and returns it to octopus for further use */
    init: function (catArray) {
      for (let cat of catArray) {
        this.catList.push({
          name: cat[0],
          photo: cat[1],
          description: cat[2],
          clicks: 0
        });
      }
      return this.catList;
    }
  }

  const octopus = {
    // this function is called by the view when it renders a cat
    countClicks: function (cat) {
      let count = cat.clicks;
      count++;
      cat.clicks = count;
      view.updateClicks(count);
    },

    // initializes the model
    init: function () {
      const catList = model.init([
        ['Rey', 'img/calicocat.png', 'calico'],
        ['Ron', 'img/tabbycat.png', 'tabby'],
        ['Tigger', 'img/tigercat.png', 'tiger'],
        ['Simon', 'img/persiancat.png', 'persian'],
        ['Scratchy', 'img/tuxedocat.png', 'tuxedo']
      ]);
      // initializes the view with data from the model - the first cat displays as default
      view.init(catList[0], catList);
    }
  }

  const view = {
    // render list of cat names and default cat
    init: function (firstCat, catList) {
      this.catArea = document.getElementById('cat-area');
      this.listArea = document.getElementById('cat-list');
      this.renderCatList(catList);
      this.renderCat(firstCat);
    },
    // render catlist on page
    renderCatList: function (list) {
      for (let cat of list) {
        const li = document.createElement('li');
        li.textContent = cat.name;
        li.addEventListener('click',
          this.renderCat.bind(this, cat) // passes in the view as value of 'this' and the specific cat as the arg
        );
        this.listArea.appendChild(li);
      }
    },

    // render selected cat
    renderCat: function (cat) {
      this.catArea.innerHTML = `
        <h3>${cat.name}</h3>
        <p>Number of clicks: <span id="click-counter">${cat.clicks}</span></p>
        <img src='${cat.photo}' alt='${cat.description} cat' id='${cat.description}-cat' />
      `;
      // remove previous cat's event listener
      this.catArea.removeEventListener('click', this.activeListener);
      this.activeListener = function (e) { // activeListener is a method created on the view
        octopus.countClicks(cat); // octopus is what actually handles the counting
      }
      // add event listener to new cat
      this.catArea.addEventListener('click', this.activeListener);
    },

    updateClicks: function (count) {
        const clickCounter = document.getElementById('click-counter');
        clickCounter.textContent = count;
    }
  }

  octopus.init();
})();
