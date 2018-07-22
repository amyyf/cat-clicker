const Cat = function (name, photo, description) {
  this.name = name;
  this.photo = photo;
  this.clicks = 0;
  this.description = '';
};

Cat.prototype.countClicks = function () {
  this.photo.addEventListener('click', function () {
    let count = this.clicks;
    count++;
  });
};

const rey = new Cat('Rey', 'img/calicocat.png', 'calico');
const ron = new Cat('Ron', 'img/tabbycat.png', 'tabby');

const generateCat = function (cat) {
  const section = document.createElement('section');
  const catArea = document.getElementById('cat-area');
  section.classList.add('cat');
  section.innerHTML = `
    <h3>${cat.name}</h3>
    <p>Number of clicks: <span id="click-counter">${cat.clicks}</span></p>
    <img src='${cat.photo}' alt=${cat.description} cat' id=${cat.description}-cat' />
  `;
  catArea.appendChild(section);
};

generateCat(rey);
generateCat(ron);
