let price_value = document.getElementById('price_addend');

let setMinPriceTags = document.getElementById('setMinPriceTags');
let setMinPriceCats = document.getElementById('setMinPriceCats');

let setMidPriceTags = document.getElementById('setMidPriceTags');
let setMidPriceCats = document.getElementById('setMidPriceCats');

let upMinPriceTags = document.getElementById('upMinPriceTags');
let upMidPriceTags = document.getElementById('upMidPriceTags');

let upMinPriceCats = document.getElementById('upMinPriceCats');
let upMidPriceCats = document.getElementById('upMidPriceCats');

let setCurrPriceTags = document.getElementById('setCurrPriceTags');
let setCurrPriceCats = document.getElementById('setCurrPriceCats');

chrome.cookies.get({url: 'https://my.prom.ua', name: 'lid'}, function(cookies) {
    user_id = cookies.value.split('-')[2];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: 'user_id='+user_id+';'
        }
      )
    });    
  });

chrome.cookies.get({url: 'https://my.prom.ua', name: 'csrf_token'}, function(cookies) {
    csrf_token = cookies.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: 'csrf_token="'+csrf_token+'";'
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

setMidPriceTags.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_mid_price("others", true)');
};

setMidPriceCats.onclick = function() {
  run_func('price_value = 0;');
  run_func('set_mid_price("prom_catalog", true)');
};

upMinPriceCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_min_price("prom_catalog", true)');
};

upMidPriceCats.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_mid_price("prom_catalog", true)');
};

upMinPriceTags.onclick = function() {
  run_func('price_value = ' + price_value.value + ';');
  run_func('set_min_price("others", true)');
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