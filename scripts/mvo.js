(function () {
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
  };

  const octopus = {
    // initializes the model
    init: function () {
      const catList = model.init([
        ['Rey', 'img/calicocat.png', 'calico'],
        ['Ron', 'img/tabbycat.png', 'tabby'],
        ['Tigger', 'img/tigercat.png', 'tiger'],
        ['Simon', 'img/persiancat.png', 'persian'],
        ['Scratchy', 'img/tuxedocat.png', 'tuxedo']
      ]);
      // create a way of holding the current cat
      this.currentCat = catList[0];
      // initializes the view with data from the model - the first cat displays as default
      view.init(this.currentCat, catList);
    },

    // this function is called by an event listener added in the view, identifies the current cat to work properly
    countClicks: function () {
      let count = this.currentCat.clicks;
      count++;
      this.currentCat.clicks = count;
      view.updateClicks(count);
    },

    // this function is called by an event listener added to each cat when rendered by the view
    setCurrentCat: function (selectedCat) {
      this.currentCat = selectedCat;
      view.renderCat(this.currentCat);
      view.populateAdminForm();
    },

    isAdminFormVisible: false,

    toggleAdminForm: function () {
      this.isAdminFormVisible = !this.isAdminFormVisible;
      view.showAdminForm();
      view.populateAdminForm();
    }

  };

  const view = {
    // render list of cat names and default cat
    init: function (firstCat, catList) {
      this.catArea = document.getElementById('cat-area');
      this.listArea = document.getElementById('cat-list');
      this.adminForm = document.getElementById('admin-form');
      this.adminButton = document.getElementById('admin');
      this.submitButton = document.getElementById('submit');
      this.nameInput = document.getElementById('cat-name');
      this.picInput = document.getElementById('cat-pic-url');
      this.clickInput = document.getElementById('click-num');
      this.catArea.addEventListener('click', octopus.countClicks.bind(octopus));
      this.adminButton.addEventListener('click', octopus.toggleAdminForm.bind(octopus));
      // this.submitButton.addEventListener('click', octopus.updateCat.bind(octopus));
      this.renderCatList(catList);
      this.renderCat(firstCat);
    },

    // render catlist on page - happens once
    renderCatList: function (list) {
      for (let cat of list) {
        const li = document.createElement('li');
        li.textContent = cat.name;
        li.addEventListener('click',
          octopus.setCurrentCat.bind(octopus, cat) // passes 'octopus' in order to access currentCat method/prop
        );
        this.listArea.appendChild(li);
      }
    },

    // render selected cat - rerun HTML every time current cat changes
    renderCat: function (cat) {
      this.catArea.innerHTML = `
        <h3>${cat.name}</h3>
        <p>Number of clicks: <span id="click-counter">${cat.clicks}</span></p>
        <img src='${cat.photo}' alt='${cat.description} cat' id='${cat.description}-cat' />
      `;
    },

    // needs to get clickCounter each time since it is dynamically created
    updateClicks: function (count) {
      const clickCounter = document.getElementById('click-counter');
      clickCounter.textContent = count;
    },

    showAdminForm: function () {
      this.adminForm.classList.toggle('hidden');
    },

    populateAdminForm: function () {
      this.nameInput.value = octopus.currentCat.name;
      this.picInput.value = octopus.currentCat.photo;
      this.clickInput.value = octopus.currentCat.clicks;
    }

  };

  octopus.init();
})();
