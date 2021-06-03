// Get all the needed items

const checkBox = document.getElementById('checkbox');
const sliderContainer = document.getElementById('speed');
const options = document.getElementById('options');
const orbitsManager = document.getElementById('orbit-container');
const title = document.getElementById('options-title');

const info_title = document.getElementById('title-info');
const info_text = document.getElementById('wrapper-text');

const allInfoElements = document.getElementById('info-container');

// Create some arrays of stored data

const names = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

const text = ['Orbit speed: 47.4 km/s \n Diameter: 4879 km \n Orbital period: 88 days \n \n Mercury is the closest planet to the sun, but is not the hottest planet in the solar system. It is also the only planet in our solar system to have no moons! As well as the only planet that is too small to have an atmosphere.',
  'Orbit speed: 35.0 km/s \n Diameter: 12,104 km \n Orbital period: 224.7 days \n \n Venus is the 2nd planet from the sun and is the hottest planet in the solar system as its atmosphere is made up mostly og greenhouse gases, which hold the suns heat in.',

  'Orbit speed: 29.8 km/s \n Diameter: 12,756 km \n Orbital period: 365.25 days \n \n Earth is the 3rd planet from the sun and is home to us humans. It is the only known planet to sustain any form of intelegent life (Humans). It is also the only known planet to sustain any life at all! Also, Earth is the only planet in our solar system to have liquid water at its surface, which is one of the reasons why life was able to evolve here.',

  'Orbit speed: 24.1 km/s \n Diameter: 6792	 km \n Orbital period: 687 days \n \n Mars is the 4th planet from the sun and is the last terrestrial planet (A planet made up of mostly rocks). Also, scientists believe that it could have once supported life millions of years ago.',

  'Orbit speed: 13.1 km/s \n Diameter: 142,984 km \n Orbital period: 4331 days \n \n Jupiter is the 5th planet from the sun and is the first gas giant in the solar system weighing more than all the planets weights combined! It is also the largests planet in our solar system, but does not have the most moons.', 
  'Orbit speed: 9.7 km/s \n Diameter: 120,536 km \n Orbital period: 10,747 days \n \n Saturn is the 6th planet from the sun and the only planet to have visible rings, which are made up of mostly ice and rock. It is also the planet which has the most moons (82 of them), even though it is smaller than Jupiter!', 

  'Orbit speed: 6.8 km/s \n Diameter: 51,118 km \n Orbital period: 30,589 days \n \n Uranus is the 7th planet in the solar system and like neptune, is made nearly entirely of a mixture of gases. Scientists have also found that one of the gases that makes up uranus is methane, which makes the planet smell like rotten eggs!!',

  'Orbit speed: 5.4 km/s \n Diameter: 49,528 km \n Orbital period: 59,800 days \n \n Neptune is the furthest planet from our sun. It is also the coldest of all the planets and is made up mostly of a mixture of gases.']

const speeds = [0.02, 0.051428, 0.08348, 0.157, 1.00112, 2.41942, 7.008, 13.765714];

// Create functions ready for the user

// The actual speed of the planets mutiplier is 380160000

loadSavedData();

function getInputOfSpeed(item) {
  var slideValue = item.value;

  // Save the data ready fro next time

  localStorage.setItem('speed', item.value);

  for(var i = 0; i < names.length; i++)
  {
    var nameOfItem = '--' + names[i] + 'Speed';
    var value = slideValue * speeds[i];
    var value = value + 's';
    console.log(value)
    document.querySelector('body').style.setProperty(nameOfItem, value);
  }
}

function setupSpeedsOfPlanets(item) {
  var slideValue = item;

  if (item > 500) {
    sliderContainer.value = "500";
  }
  else {
    sliderContainer.value = item;
  }

  // Save the data eady fro next time

  for(var i = 0; i < names.length; i++)
  {
    var nameOfItem = '--' + names[i] + 'Speed';
    var value = slideValue * speeds[i];
    var value = value + 's';
    console.log(value)
    document.querySelector('body').style.setProperty(nameOfItem, value);
  }
}

// Load the saved data

function loadSavedData() {
  var data = localStorage.getItem('speed');
  
  if (data == null) {
    data = 500;
    localStorage.setItem('speed', 500);
  }
 
  sliderContainer.value = data;

  setupSpeedsOfPlanets(data);

  var savedInfo = localStorage.getItem('checked');

  if (savedInfo == 1) {
    checkBox.checked = true;
  }
  else if (savedInfo == null) {
    checkBox.checked = false;
    localStorage.setItem('checked', 0);
  }
  else {
    checkBox.checked = false;
  }

  updateStateOfSystem(checkBox.checked);
}

// Check the media of the user

function checkMediaOfUser(media) {
  if (media.matches) 
  {
    // User is on a mobile device

    options.classList.add('options-mobile');

    document.getElementById('space').classList.add('spacing-mobile');

    title.classList.add('options-title-mobile');

    allInfoElements.classList.add('wrapper-hidden');

  } else {
    //User is not on a mobile device

    options.classList.remove('options-mobile');

    document.getElementById('space').classList.remove('spacing-mobile');

    title.classList.remove('options-title-mobile');

    allInfoElements.classList.remove('wrapper-hidden');
  }
}

// Detect when the screen size changes and adjust accordingly

var x = window.matchMedia("(max-width: 700px)")
checkMediaOfUser(x)
x.addListener(checkMediaOfUser)

// Reset all the data on button click

function resetData() {
  localStorage.setItem('speed', 500);

  sliderContainer.value = "500";

  setupSpeedsOfPlanets(500);

  checkBox.checked = false;
  localStorage.setItem('checked', 0);

  updateStateOfSystem(checkBox.checked);
}

// Get the checkbox status

function saveCheckState() {

  if (checkBox.checked) {
    localStorage.setItem('checked', 1);
  }
  else {
    localStorage.setItem('checked', 0);
  }

  updateStateOfSystem(checkBox.checked);
}

function updateStateOfSystem(item) {
  
  if (item) {
    orbitsManager.classList.add('showing');
    orbitsManager.classList.remove('hiding');
  }
  else {
    orbitsManager.classList.remove('showing');
    orbitsManager.classList.add('hiding');
  }
}

// Show the information of the current planets
function showUserInfo(num) {
  
  info_title.innerText = capitaliseFirstLetter(names[num]);

  info_text.innerText = text[num];
}

function capitaliseFirstLetter(word) {
 return word.substring(0, 1).toUpperCase() + word.slice(1);
}
