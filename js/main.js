function get_input_prices() {
    var input_prices = $('.b-textbox').map(
            function() { return parseFloat($(this).attr('value')); }
        );
    return input_prices;
}

function get_categories() {
    var categories = $('span.b-more-link').map(
            function() { return $(this).attr('data-category-id'); }
        );
    return categories;

}

function get_values(query) {
    var results = $(query).map(function() { return parseFloat($(this).text()); });
    return results;
}

function get_inputs(query) {
    var inputs = $(query);
    return inputs;
}


function parse_cookies(){
    cookiesList = document.cookie.split('; ')
    cookiesObject = {}
    cookiesList.forEach(c => {
        cl = c.split('=');
        key = cl[0];
        value = cl[1];
        cookiesObject[key] = value;
    });
    return cookiesObject
}


let cookies = parse_cookies();

function make_request(url, data) {
    $.ajax({
        url: url,
        headers: {
            "x-promuserid": cookies.lid,
            "x-csrftoken": cookies.csrf_token
        },
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: data,
        xhrFields: {withCredentials: true},
        success: function(data) {console.log(data);}
    })
}

function set_prices(prices, source, add) {
    // console.log(cookies)
    var company_id = location.pathname.split('/')[3]
    var url = 'https://my.prom.ua/remote/product_adv/set_category_custom_price/' + company_id;
    $(prices).each(function(index) {
        if (add == true)
            price = parseFloat(prices[index]) + parseFloat(price_value);
        else
            price = parseFloat(price_value);
        data = 'id=' + categories[index] + '&price=' + price + '&sources=' + source;
        console.log("DATA: " + data)
        make_request(url, data)
    });
}

function set_rates(rates, source, add) {
    var company_id = location.pathname.split('/')[3]
    var url = 'https://my.prom.ua/remote/product_adv/set_category_commission_rate/' + company_id;
    $(rates).each(function(index) {
        if (add == true)
            price = (parseFloat(rates[index]) + parseFloat(price_value)) / 100;
        else
            price = parseFloat(price_value) / 100;
        data = 'category_id=' + categories[index] + '&rate=' + price + '&sources=' + source;
        console.log("DATA: " + data)
        make_request(url, data)
    }); 
}

function set_min_price(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="min_price_value"]');
    inputs = get_inputs('input[data-qaid="own_price_input"]');
    set_prices(prices, source, add);
}

function set_mid_price(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="medium_price_value"]');
    inputs = get_inputs('input[data-qaid="own_price_input"]');
    set_prices(prices, source, add);
}

function add_to_curr_price(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="max_price_value"]');
    inputs = get_inputs('input[data-qaid="own_price_input"]');
    set_prices(prices, source, add);
}

function set_min_rate(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="min_rate_value"]');
    inputs = get_inputs('input[data-qaid="own_rate_input"]');
    set_rates(prices, source, add);
}

function set_mid_rate(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="medium_rate_value"]');
    inputs = get_inputs('input[data-qaid="own_rate_input"]');
    set_rates(prices, source, add);
}

function add_to_curr_rate(source, add) {
    categories = get_categories();
    prices = get_values('span[data-qaid="max_rate_value"]');
    inputs = get_inputs('input[data-qaid="own_rate_input"]');
    set_rates(prices, source, add);
}

