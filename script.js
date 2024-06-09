let dishes = [
    {
        'headline': 'Salate',
        'sectionImg': './img/salad-section.jpg',
        'selection': [
            {
                'dishName': 'Salatmix',
                'description': 'Bunt gemischter Salat-Teller',
                'prices': 6.00,
                'dishImg': './img/mixed-salad.jpg',
            },
            {
                'dishName': 'Hähnchen Salat',
                'description': 'Salat-Teller mit hänchen Streifen und einem Honig-Mango-Dressing',
                'prices': 8.60,
                'dishImg': './img/chicken-salad.jpg',
            },
            {
                'dishName': 'Chili-Cheese Salat',
                'description': 'Ein mit Käse überbackener Salatmix, mit einem scharfen Chili-Dressing',
                'prices': 9.90,
                'dishImg': './img/chili-cheese-salad.jpg',
            }
        ]
    },
    {
        'headline': 'Burger',
        'sectionImg': './img/burger-section.jpg',
        'selection': [
            {
                'dishName': 'MacFly Burger',
                'description': 'Burger mit hähnchen Fleisch und einem Mayo-Trüffel-Soße',
                'prices': 10.30,
                'dishImg': './img/chicken-burger.jpg',
            },
            {
                'dishName': 'Beyond Burger',
                'description': 'Burger mit Hähnchen-Ersatz und einem Mayo-Trüffel-Soße',
                'prices': 10.00,
                'dishImg': './img/beyond-burger.jpg',
            },
            {
                'dishName': 'MacCheese Burger',
                'description': 'Burger mit Rindefleisch und extra viel Käse',
                'prices': 11.20,
                'dishImg': './img/cheese-burger.jpg',
            },
            {
                'dishName': 'MacRip Burger',
                'description': 'Burger mit Rindefleisch und Bacon',
                'prices': 12.50,
                'dishImg': './img/rip-burger.jpg',
            }
        ]
    },
    {
        'headline': 'Suppen',
        'sectionImg': './img/soups.jpg',
        'selection': [
            {
                'dishName': 'Tomatensoẞe',
                'description': 'Hausgemachte pikante Tomatensoẞe, mit Tomaten aus eigenem Anbau',
                'prices': 6.00,
                'dishImg': './img/tomatosoup.jpg',
            },
            {
                'dishName': 'Kürbissuppe',
                'description': 'Selbstgemachte Kürbissuppe mit Sonnenblumkernen',
                'prices': 6.50,
                'dishImg': './img/pumkinsoup.jpg',
            },
            {
                'dishName': 'Kartoffelsuppe',
                'description': 'Hausgemachte Kartoffelsuppe mit Karottenstücken und Basilikumblättern',
                'prices': 8.00,
                'dishImg': './img/potatosoup.jpg',
            },
        ]
    },
    {
        'headline': 'Beilagen',
        'sectionImg': './img/side-dishes.jpg',
        'selection': [
            {
                'dishName': 'Pommes Frites',
                'description': 'Große Portion goldgebrannter Pommes Frites',
                'prices': 5.00,
                'dishImg': './img/pommes.jpg',
            },
            {
                'dishName': 'Mac and Cheese',
                'description': 'Makkaroni in Käsesoße, mit Käse überbacken',
                'prices': 6.50,
                'dishImg': './img/mac-and-cheese.jpg',
            },
            {
                'dishName': 'Ketchup / Majo',
                'description': 'Eine Schüssel Ketchup, Majo, Chilisauce oder Senf',
                'prices': 1.00,
                'dishImg': './img/ketchup-majo.jpg',
            }
        ]
    }
];
let cart = [];
let orderStatus = 'deliver';
let sliderStatus = 'forward';
let totalBill = 0;
let mediaStatus = false;
let soupDnone = false;


function render() {
    let content = document.getElementById('dish-list');

    content.innerHTML = '';
    document.getElementById('open-cart').innerHTML = /*html*/`
        Aktuelle Bestellwert: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalBill)}  
    `;

    renderResturantContent(content);
    renderSelection();
    renderCart();
}


function checkMedia() {
    let soup = document.getElementById('soup');
    let mediaQuery = window.matchMedia('(max-width: 450px)');

    if (mediaQuery.matches) {
        soup.classList.add('d-none');
        mediaStatus = true;
        soupDnone = true;
    } else {
        mediaStatus = false;
    }
    if (mediaStatus == false && soupDnone == true) {
        soup.classList.remove('d-none');
    }
}


function changeSlider() {
    let salad = document.getElementById('salad');
    let burger = document.getElementById('burger');
    let soup = document.getElementById('soup');
    let sideDish = document.getElementById('side-dish');

    if (mediaStatus == true) {
        moveSliderWithMedia(salad, burger, soup, sideDish)
    } else {
        moveSliderWithoutMedia(salad, sideDish);
    }
}


function moveSliderWithMedia(salad, burger, soup, sideDish) {
    if (sliderStatus == 'forward') {
        salad.classList.add('d-none');
        burger.classList.add('d-none');
        soup.classList.remove('d-none');
        sideDish.classList.remove('d-none');
        sliderStatus = 'back';
    } else {
        salad.classList.remove('d-none');
        burger.classList.remove('d-none');
        soup.classList.add('d-none');
        sideDish.classList.add('d-none');
        sliderStatus = 'forward';
    }
}


function moveSliderWithoutMedia(salad, sideDish) {
    if (sliderStatus == 'forward') {
        salad.classList.add('d-none');
        sideDish.classList.remove('d-none');
        sliderStatus = 'back';
    } else {
        salad.classList.remove('d-none');
        sideDish.classList.add('d-none');
        sliderStatus = 'forward';
    }
}


function orderVariant() {
    let slider = document.getElementById('slyder');
    let orderOption = document.getElementById('deliver-pickup');

    if (orderStatus == "deliver") {
        slider.style = 'transform: translateX(100%);';
        slider.innerHTML =/*html*/`<img src="./img/bag_green.svg">Abholung<br>ab 17:15`;
        orderStatus = "pickup";
        orderOption.innerHTML =/*html*/`Residenzstraße 59, 13409 Berlin`;
    } else {
        movedSlider(orderOption, slider);
    }
    calculateBill();
}


function movedSlider(orderOption, slider) {
    slider.style = 'transform: translateX(0%);';
    slider.innerHTML =/*html*/`<img src="./img/bike_green.svg">Lieferung<br>ab 17:15`;
    orderStatus = "deliver";
    orderOption.innerHTML =/*html*/`
        <div>
            <span>Min. 20.00 €</span>
            <span class="min-pick-up">1.50 €</span>
        </div>
    `;
}


function addToCart(dishName, dishprice) {
    if (cart.length >= 5) {
        alert('Warenkorb zu voll, maximal 5 Gerichte einfügen.')
    } else {
        if (cart.find(item => item.name === dishName)) {
            cart.find(item => item.name === dishName).amount += 1;
        } else {
            cart.push({
                'name': dishName,
                'amount': 1,
                'price': dishprice
            });
        }
    }

    renderBasket();
}


function addAmount(status, i) {
    if (status == true) {
        cart[i]['amount'] += 1;
    } else {
        if (cart[i]['amount'] > 1) {
            cart[i]['amount'] -= 1;
        } else {
            cart.splice(i, 1);
        }
    }

    renderCart();
}


function calculateBill() {
    let subtotal = 0;
    for (i = 0; i < cart.length; i++) {
        if (cart[i]['amount'] >= 2) {
            subtotal += cart[i]['price'] * cart[i]['amount'];
        } else {
            subtotal += cart[i]['price'];
        }
    };
    let deliverCost = 1.5;
    let total = subtotal;
    
    totalBill = subtotal;
    renderBill(deliverCost, subtotal, total);
}


function renderBill(deliverCost, subtotal, total) {
    document.getElementById('calculator').innerHTML = '';
    if (orderStatus == 'deliver') {
        total += deliverCost;
        document.getElementById('calculator').innerHTML =/*html*/`
        Lieferkosten: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(deliverCost)} <br>
        `;
    }
    document.getElementById('calculator').innerHTML +=/*html*/`
        Zwischensumme: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(subtotal)} <br>
        Endbetrag: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total)}
    `;
    document.getElementById('open-cart').innerHTML = /*html*/`
        Aktuelle Bestellwert: ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalBill)}  
    `;
}


function sendOrder() {
    let orderedDish = document.getElementById('ordered-content');
    let form = document.getElementById('order-form');

    if (orderStatus == 'deliver' && totalBill <= 20) {
        alert('Kein aussreichender Mindestbestellwert. Mindestens 20€!')
    } else {
        renderSendOrder(orderedDish, form);
        calculateBill();
    }
}

function renderSendOrder(orderedDish, form) {
    cart.splice(0, cart.length);
    form.classList.add('d-none');
    form.classList.remove('form-order');
    orderedDish.classList.remove('overflow-scroll');
    orderedDish.innerHTML = /*html*/`
            <div class="empty-cart">
                <img src="./img/order_send.svg">
                <span>Vielen Dank für Ihre Bestellung!</span>
            </div>  
        `;
    setTimeout(function () {
        renderBasket()
    }, 2000);
}


function openOverlay() {
    let cartOverlay = document.getElementById('cart');
    let body = document.getElementById('body');

    cartOverlay.style = 'transform: translateX(0%)';
    body.classList.remove('overflow-x');
    body.classList.add('overflow-hidden');
}


function closeOverlay() {
    let cartOverlay = document.getElementById('cart');
    let body = document.getElementById('body');

    cartOverlay.style = 'transform: translateX(100%)';
    body.classList.remove('overflow-hidden');
    body.classList.add('overflow-x');
}