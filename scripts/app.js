const Cat = function (name, photo, description) {
  this.name = name;
  this.photo = photo;
  this.clicks = 0;
  this.description = description;
};

Cat.prototype.generateCat = function () {
  const section = document.createElement('section');
  const catArea = document.getElementById('cat-area');
  section.classList.add('cat');
  section.innerHTML = `
    <h3>${this.name}</h3>
    <p>Number of clicks: <span id="${this.name}-click-counter">${this.clicks}</span></p>
    <img src='${this.photo}' alt='${this.description} cat' id='${this.description}-cat' />
  `;
  catArea.appendChild(section);
  section.addEventListener('click', this.countClicks.bind(this));
};

Cat.prototype.countClicks = function () {
  const clickCounter = document.getElementById(`${this.name}-click-counter`);
  let count = this.clicks;
  count++;
  this.clicks = count;
  clickCounter.textContent = count;
};

const rey = new Cat('Rey', 'img/calicocat.png', 'calico').generateCat();
const ron = new Cat('Ron', 'img/tabbycat.png', 'tabby').generateCat();
