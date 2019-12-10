let price_value = document.getElementById('price_addend');

let setMinPriceTags = document.getElementById('setMinPriceTags');
let setMinPriceCats = document.getElementById('setMinPriceCats');
let setMinRate = document.getElementById('setMinRate');

let setMidPriceTags = document.getElementById('setMidPriceTags');
let setMidPriceCats = document.getElementById('setMidPriceCats');

let setMidRate = document.getElementById('setMidRate');

let upMinPriceTags = document.getElementById('upMinPriceTags');
let upMidPriceTags = document.getElementById('upMidPriceTags');

let upMidRate = document.getElementById('upMidRate');

let upMinPriceCats = document.getElementById('upMinPriceCats');
let upMidPriceCats = document.getElementById('upMidPriceCats');

let setCurrPriceTags = document.getElementById('setCurrPriceTags');
let setCurrPriceCats = document.getElementById('setCurrPriceCats');

let setCurrRate = document.getElementById('setCurrRate');

let setCurrPriceBiglCats = document.getElementById('setCurrPriceBiglCats')
let setCurrPriceBiglOther = document.getElementById('setCurrPriceBiglOther')

chrome.cookies.get({url: 'https://my.prom.ua', name: 'lid'}, function(cookies) {
    uid = cookies.value.split('-')[2];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: 'user_id='+uid+'; localStorage.setItem("user_id", '+uid+');'
        }
      )
    });
  });

chrome.cookies.get({url: 'https://my.prom.ua', name: 'csrf_token'}, function(cookies) {
    token = cookies.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: 'csrf_token="'+token+'";'
        }
      )
    }); 
  });

function run_func(func) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: func
      }
    )
  });
};


setMinPriceTags.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_min_price("others", true)');
};

setMinPriceCats.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_min_price("prom_catalog", true)');
};

setMinRate.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_min_rate("prom,group_bigl", true)');
};

setMidPriceTags.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_mid_price("others", true)');
};

setMidPriceCats.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_mid_price("prom_catalog", true)');
};

setMidRate.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_mid_rate("prom,group_bigl", true)');
};

upMinPriceCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_min_price("prom_catalog", true)');
};

upMidPriceCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_mid_price("prom_catalog", true)');
};

upMidRate.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_mid_rate("prom,group_bigl", true)');
};

upMinPriceTags.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_min_price("others", true)');
};

upMinRate.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_min_rate("prom,group_bigl", true)');
};

upMidPriceTags.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_mid_price("others", true)');
};


setCurrPriceTags.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('add_to_curr_price("others", false)');
};

setCurrPriceCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('add_to_curr_price("prom_catalog", false)');
};

setCurrPriceBiglCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('add_to_curr_price("bigl_catalog", false)');
};

setCurrPriceBiglOther.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('add_to_curr_price("bigl", false)');
};

setCurrRate.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('add_to_curr_rate("prom,group_bigl", false)');
};