/* let user = {
    name: "Вася",
    surname: "Васильев",
    get fullName() { // свойство аксессор get - только возвращает результат
        return `${this.name} ${this.surname}`
    },
    set fullName(a) { // свойство аксессор set - только получает значение
        let arr = a.split(" ");
        this.name = arr[0];
        this.surname = arr[1];
    }
}

console.log(user);
user.fullName = "Петя Петров";
console.log(user); */

// Объект с продукцией
let product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}
// Объект с ингредиентами
let extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}

let btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    const element = btnPlusOrMinus[i];
    element.addEventListener("click", function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // .closest() - возвращает родителя по селектору
    const parent = element.closest(".main__product");
    // .hasAttribute(name) - возвращает true, если атрибут есть
    // .getAttribute(name) - возвращает значение атрибута
    // .setAttribute(name, value) - изменяет значение атрибута
    // .removeAttribute(name) - удаляет атрибут
    let parentId = parent.getAttribute("id") // id секции в которой находится плюс или минус
    let symbol = element.getAttribute("data-symbol") // символ + или -
    if (symbol == "+" && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (symbol == "-" && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    
    const num = parent.querySelector('.main__product-num');
    num.innerHTML = product[parentId].amount;
    const sum = parent.querySelector('.main__product-price span')
    sum.innerHTML = product[parentId].Summ;
    const kcall = parent.querySelector('.main__product-kcall span');
    kcall.innerHTML = product[parentId].Kcall;
}

// чекбоксы ингредиентов
const checkBox = document.querySelectorAll('.main__product-checkbox');
for (let i = 0; i < checkBox.length; i++) {
    const element = checkBox[i];
    element.addEventListener("click", function () {
        addExtraProduct(this);
    })
}

function addExtraProduct(element) {
    const parent = element.closest(".main__product");
    let parentId = parent.getAttribute("id");
    let elAtr = element.getAttribute("data-extra");
    product[parentId][elAtr] = element.checked
    // console.log(product[parentId]);
    if (product[parentId][elAtr] == true) {
        product[parentId].kcall = product[parentId].kcall + extraProduct[elAtr].kcall 
        product[parentId].price = product[parentId].price + extraProduct[elAtr].price 
    } else {
        product[parentId].kcall = product[parentId].kcall - extraProduct[elAtr].kcall
        product[parentId].price = product[parentId].price - extraProduct[elAtr].price
    }
    const sum = parent.querySelector('.main__product-price span')
    sum.innerHTML = product[parentId].Summ;
    const kcall = parent.querySelector('.main__product-kcall span');
    kcall.innerHTML = product[parentId].Kcall;
}

// кнопка Заказать 
const addCart = document.querySelector('.addCart');

// модальное окно
const receipt = document.querySelector('.receipt');
// Чек
const receiptWindow = document.querySelector('.receipt__window');
// информация чека 
const receiptWindowOut = document.querySelector('.receipt__window-out');
// кнопка модального окна
const receiptWindowBtn = document.querySelector('.receipt__window-btn');

// ссылка на объект
/* let x = {name: "Вася"};
let y = x;
console.log(x);
console.log(y);
y.name = "Петя";
console.log(x);
console.log(y); */

let totalName = ""; // список товаров
let totalPrice = 0; // общая цена 
let totalKcall = 0; // общая каллорийность
let arrayProduct = []; // выбранная продукции

addCart.addEventListener("click", function () {
    for (const key in product) {
        const po = product[key];
        if (po.amount > 0) {
            arrayProduct.push(po);
            for (const exPo in po) {
                if (po[exPo] === true) {
                    // "\n" - символ переноса строки 
                    // po.name = po.name + "\n" + extraProduct[exPo].name
                    po.name += `\n${extraProduct[exPo].name}`
                }
            }
            /* po.price = po.Summ;
            po.kcall = po.Kcall; */                                               
        }
    }  
    for (let i = 0; i < arrayProduct.length; i++) {
        const element = arrayProduct[i];
        totalName += "\n" + element.name + "\n" // складываем все названия продуктов
        totalPrice += element.Summ;
        totalKcall += element.Kcall;
    }
    receiptWindowOut.innerHTML = `Вы купили: \n${totalName} \nКаллорийность: ${totalKcall} \nСтоимость покупки: ${totalPrice} сумм`;
    receipt.style.display = "flex";
    setTimeout(() => {
        receipt.style.opacity = 1;              
        receiptWindow.style.top = 0;   
    }, 10);
    document.body.style.overflow = "hidden";
    const num = document.querySelectorAll('.main__product-num');  
    const sum = document.querySelectorAll('.main__product-price span') 
    const kcall = document.querySelectorAll('.main__product-kcall span');
    
    for (let i = 0; i < num.length; i++) {
        num[i].innerHTML = 0;
        sum[i].innerHTML = 0;
        kcall[i].innerHTML = 0;
    }               
})

receiptWindowBtn.addEventListener("click", function () {
    window.location.reload();
})

let info = document.querySelectorAll('.main__product-info');
let view = document.querySelector('.view');
let viewClose = document.querySelector('.view__close');
info.forEach(element =>{
    element.addEventListener("dblclick", function () {
        view.classList.add("active")
    })
    
})
viewClose.addEventListener("click", function () {
    view.classList.remove("active")
})


function stepByStep() {
    let num = document.querySelector('.header__timer-extra');
    num.innerHTML++ 
    if (num.innerHTML < 20) {
        setTimeout(() => {
            stepByStep()
        }, 80);
    } else if (num.innerHTML < 50) {
        setTimeout(() => {
            stepByStep()
        }, 100);
    } else if (num.innerHTML < 80) {
        setTimeout(() => {
            stepByStep()
        }, 170);
    } else if (num.innerHTML < 95) {
        setTimeout(() => {
            stepByStep()
        }, 250);
    } else if (num.innerHTML <= 99) {
        setTimeout(() => {
            stepByStep()
        }, 300);
    }
    
}
stepByStep()  