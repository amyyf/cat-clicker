const cat = document.getElementById('cat-photo');
const clickCounter = document.getElementById('click-counter');

clickCounter.textContent = 0;

cat.addEventListener('click', function () {
  let count = clickCounter.textContent;
  count++;
  clickCounter.textContent = count;
});
