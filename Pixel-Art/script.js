const painel = document.getElementById('pixel-board');
let corAtual = document.querySelector('.selected');
let cssObj = window.getComputedStyle(corAtual, null);
const cores = document.getElementsByClassName('color');
const botao = document.getElementById('generate-board');
let valor = document.getElementById('board-size').value;
const random = document.getElementsByClassName('random');
const botaoRandom = document.getElementById('button-random');
const botaoAdd = document.getElementById('choose-color');
const defined = document.querySelector('.defined');
const actualColor = document.querySelector('.actual');
const botaoLimpar = document.getElementById('clear-board');
const inputAdd = document.getElementById('choose-input');
const paletaUm = document.getElementById('color-palette');
const paletaDois = document.getElementById('second-palette');
const white = document.getElementById('white-color');
const limpaCor = document.getElementById('clear-color');
const minimizar = document.getElementById('minimizar');
const paletteSection = document.querySelector('section.palette-section');

function color() {
  defined.style.backgroundColor = inputAdd.value;
}

function selecionaCor() {
  // console.log(event.target);
  corAtual.classList.remove('selected');
  this.classList.add('selected');
  corAtual = document.querySelector('.selected');
  cssObj = window.getComputedStyle(corAtual, null);
  actualColor.style.backgroundColor = cssObj.getPropertyValue('background-color');
}

function randomColor() {
  for (let index = 0; index < random.length; index += 1) {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    random[index].style.backgroundColor = `rgb(${r} ,${g} ,${b})`;
  }
}

function addPixelColor() {
  const pixel = document.createElement('div');
  pixel.className = 'color';
  pixel.style.backgroundColor = inputAdd.value;
  pixel.addEventListener('click', selecionaCor);
  if (paletaUm.children.length < 6) {
    paletaUm.appendChild(pixel);
  } else if (paletaDois.children.length < 6) {
    paletaDois.appendChild(pixel);
  }
}

function addPixelRandom() {
  const pixel = document.createElement('div');
  pixel.className = 'color random';
  pixel.addEventListener('click', selecionaCor);
  if (paletaUm.children.length < 6) {
    paletaUm.appendChild(pixel);
  } else if (paletaDois.children.length < 6) {
    paletaDois.appendChild(pixel);
  }
}

function addColor() {
  if (inputAdd.value !== '' && inputAdd.value !== 'random') {
    addPixelColor();
  } else if (inputAdd.value === '' || inputAdd.value === 'random') {
    addPixelRandom();
  }
}

function clickCor() {
  for (let index = 0; index < cores.length; index += 1) {
    cores[index].addEventListener('click', selecionaCor);
  }
  white.addEventListener('click', selecionaCor);
}

function mudaCor() {
  // recebeID(corAtual)
  this.style.backgroundColor = cssObj.getPropertyValue('background-color');
}

function limpapixel() {
  while (painel.children.length !== 0) {
    painel.removeChild(painel.firstElementChild);
  }
}

function inputValue() {
  valor = document.getElementById('board-size').value;
  if (valor > 50) {
    valor = 50;
    alert('Board invalido!');
  } else if (valor < 5) {
    valor = 5;
    alert('Board invalido!');
  }
  return valor;
}

function pixels() {
  limpapixel();
  const value = inputValue();

  painel.style.maxWidth = `${value * 40}px`;
  for (let index = 0; index < value * value; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.addEventListener('click', mudaCor);
    painel.appendChild(pixel);
  }
}

function clearColor() {
  while (paletaUm.children.length > 4) {
    paletaUm.removeChild(paletaUm.lastElementChild);
  }
  while (paletaDois.children.length > 1) {
    paletaDois.removeChild(paletaDois.lastElementChild);
  }
}

function clear() {
  limpapixel();
  painel.style.maxWidth = '200px';
  for (let index = 0; index < 25; index += 1) {
    const pixel2 = document.createElement('div');
    pixel2.className = 'pixel';
    pixel2.addEventListener('click', mudaCor);
    painel.appendChild(pixel2);
  }
}

function minimize() {
  if (minimizar.className === 'show') {
    paletteSection.style.display = 'none';
    minimizar.className = 'hidden';
  } else if (minimizar.className === 'hidden') {
    paletteSection.style.display = 'inline-block';
    minimizar.className = 'show';
  }
}

minimizar.addEventListener('click', minimize);
limpaCor.addEventListener('click', clearColor);
inputAdd.addEventListener('input', color);
botaoLimpar.addEventListener('click', clear);
botaoAdd.addEventListener('click', addColor);
botao.addEventListener('click', pixels);
botaoRandom.addEventListener('click', randomColor);
randomColor();
pixels();
clickCor();
