const gallery = document.getElementById('gallery');
const load = document.getElementById('load');
const clear = document.getElementById('clear');
const remove = document.getElementById('remove');
const reverse = document.getElementById('reverse');
let loaded = [];

async function fetchPics(count = 4) {
  try {
    const response = await fetch('https://picsum.photos/v2/list');
    const data = await response.json();
    return data.slice(loaded.length, loaded.length + count);
  } catch (error) {
    console.error('Не вийшло завантажити картинки:', error);
  }
}

async function loadPics(count = 4) {
  const images = await fetchPics(count);
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/` + image.id + `/200/200`;
    gallery.appendChild(img);
    loaded.push(image.id);
  });
}

load.addEventListener('click', () => loadPics());

clear.addEventListener('click', () => {
  if (loaded.length != 0) {
    gallery.innerHTML = '';
    loaded = [];
  } else {
    alert('Картинок немає для очищення.');
  }
});

remove.addEventListener('click', () => {
  if(loaded.length != 0) {
        if (gallery.lastChild) {
            gallery.removeChild(gallery.lastChild);
            loaded.pop();
        }
    } else {
        alert('Картинок немає для видалення.');
    }
});

reverse.addEventListener('click', () => {
  if (loaded.length != 0) {
    const images = Array.from(gallery.childNodes);
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
  } else {
    alert('Картинок немає для відображення їх у зворотньому порядку.');
  }
});

document.addEventListener('DOMContentLoaded', () => loadPics());
