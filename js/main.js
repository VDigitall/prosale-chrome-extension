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

function get_min_prices() {
    var min_prices = $('span[data-qaid="min_price_value"]').map(
            function() { return parseFloat($(this).text()); }
        );
    return min_prices;
}

function get_max_prices() {
    var max_prices = $('span[data-qaid="max_price_value"]').map(
            function() { return parseFloat($(this).text()); }
        );
    return max_prices;
}

function get_mid_prices() {
    var mid_prices = $('span[data-qaid="medium_price_value"]').map(
            function() { return parseFloat($(this).text()); }
        );
    return mid_prices;
}

function get_inputs() {
    var inputs = $('input[data-qaid="own_price_input"]');
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

function set_prices(prices, source, add) {
    // console.log(cookies)
    company_id = location.pathname.split('/')[3]
    var tags_and_search = 'https://my.prom.ua/remote/product_adv/set_category_custom_price/' + company_id;
    $(prices).each(function(index) {
        if (add == true)
            price = parseFloat(prices[index]) + parseFloat(price_value);
        else
            price = parseFloat(price_value);
        data = 'id=' + categories[index] + '&price=' + price + '&source=' + source;
        console.log("DATA: " + data)
        $.ajax({
            url: tags_and_search,
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
    });
}


function set_min_price(source, add) {
    categories = get_categories();
    prices = get_min_prices();
    inputs = get_inputs();
    set_prices(prices, source, add);
}

function set_mid_price(source, add) {
    categories = get_categories();
    prices = get_mid_prices();
    inputs = get_inputs();
    set_prices(prices, source, add);
}

function add_to_curr_price(source, add) {
    categories = get_categories();
    prices = get_input_prices();
    inputs = get_inputs();
    set_prices(prices, source, add);
}


// Criteo
// id: 1250308
// price: 1.1
// source: criteo