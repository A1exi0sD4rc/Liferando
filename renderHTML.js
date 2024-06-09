function renderResturantContent(content) {
    for (i = 0; i < dishes.length; i++) {
        const dishSection = dishes[i];

        content.innerHTML += /*html*/`
            <div id="section${i}" class="dish-section">
                <img id="dish-section-img${i}" src="${dishSection['sectionImg']}">
                <h3>${dishSection['headline']}</h3>
                <div id="dish-container${i}"></div>
            </div>  
        `;
        for (x = 0; x < dishes[i]['selection'].length; x++) {
            loadDishItem(dishSection);
        }
    }
}


function loadDishItem(dishSection) {
    const dish = dishSection['selection'][x];
    const container = document.getElementById(`dish-container${i}`);

    container.innerHTML += /*html*/`
                <div class="dish">
                    <div class="d-flex">
                        <img src="${dish['dishImg']}">
                        <div id="section${i}" class="dish-description">
                            <h4>${dish['dishName']}</h4>
                            <span>${dish['description']}</span>
                            <h4>${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dish['prices'])}</h4>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="seperator-vertikal"></div>
                        <button id="add-cart" onclick="addToCart('${dish['dishName']}', ${dish['prices']})"></button>
                    </div>
                </div>
            `;
}


function renderSelection() {
    let sliderContainer = document.getElementById('dish-slider');

    sliderContainer.innerHTML = '';
    sliderContainer.innerHTML += /*html*/`
        <button class="selection-btn back-btn" onclick="changeSlider()"></button>
        <div class="selection-slider">
            <a id="salad" class="dish-card" href="#section0">Salat</a>
            <a id="burger" class="dish-card" href="#section1">Burger</a>
            <a id="soup" class="dish-card" href="#section2">Suppen</a>
            <a id="side-dish" class="dish-card d-none" href="#section3">Beilagen</a>
        </div>
        <button class="selection-btn forward-btn" onclick="changeSlider()"></button>      
    `;
}

function loadOrderVariantSlyder() {
    let orderOpinion = document.getElementById('order-variant');

    orderOpinion.innerHTML = '';
    orderOpinion.innerHTML +=/*html*/`
        <button onclick="orderVariant()"><img src="./img/bike.svg">Lieferung<br>ab 17:15</button>
        <button onclick="orderVariant()"><img src="./img/bag.svg">Abholung<br>ab 17:15</button>
        <div id="slyder" class="deliver-pickup-slyder"><img id="slyder-img" src="./img/bike_green.svg">Lieferung<br>ab 17:15</div>
    `;
}


function renderCart() {
    let basket = document.getElementById('cart');

    basket.innerHTML = '';
    basket.innerHTML =/*html*/`
        <button id="close-cart" class="close-overlay d-none" onclick="closeOverlay()"></button>
        <h1>Warenkorb</h1>
        <div id="order-variant" class="deliver-pickup-cart"></div>
        <div id="ordered-content"></div>
        <div id="order-form" class="form-order">
            <div id="calculator"></div>
            <button class="send-order" onclick="sendOrder()">Bestellen</button>
        </div>
    `;
    loadOrderVariantSlyder();
    renderBasket();
}


function renderEmptyBasket(orderedDish) {
    orderedDish.innerHTML += /*html*/`
            <div class="empty-cart">
                <img src="./img/bag.svg">
                <span>Fülle deinen Warenkorb, füge einige leckere Gerichte,
                     aus der Speisekarte hinzu und bestelle dein Essen</span>
            </div>  
        `;
}


function renderBasket() {
    let orderedDish = document.getElementById('ordered-content');
    let form = document.getElementById('order-form');

    orderedDish.innerHTML = '';
    if (cart.length == 0) {
        hideCalculatorOrder(form, orderedDish);
        renderEmptyBasket(orderedDish);
    } else {
        renderOrderedItems(orderedDish, form);
    }
}


function hideCalculatorOrder(form, orderedDish) {
    form.classList.add('d-none');
    form.classList.remove('form-order');
    orderedDish.classList.remove('overflow-scroll');
}


function showCalculatorOrder(form, orderedDish) {
    orderedDish.classList.add('overflow-scroll');
    form.classList.remove('d-none');
    form.classList.add('form-order');
}


function renderOrderedItems(orderedDish, form) {
    for (d = 0; d < cart.length; d++) {
        renderItem(orderedDish);
    }
    showCalculatorOrder(form, orderedDish);
    calculateBill();
}


function renderItem(orderedDish) {
    const cartItem = cart[d];
    orderedDish.innerHTML += /*html*/`
        <div class="cart-item">
            <div>
                <h4>${cartItem['name']}</h4>
                <h5>${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cartItem['price'])}</h5>
            </div> 
            <div class="cart-item-counter">
                <button class="cart-item-plus" onclick="addAmount(${true}, ${d})"></button>
                <span>${cartItem['amount']}</span>
                <button class="cart-item-minus" onclick="addAmount(${false}, ${d})"></button>
            </div>
        </div>
    `;
}