class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }

    setAvailable(replacement) {
        if (replacement === true || replacement === false) {
            this.available = replacement
        } else {
            console.error('Введено не верное значение')
        }
    }
}

class GoodsList {
    #goods
    constructor(filter, sortPrice, sortDir) {
        this.#goods = []
        this.filter = filter
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }

    get list() {
        const forSaleList = this.#goods.filter(good => this.filter.test(good.name))
        
        if (!this.sortPrice) {
            return forSaleList
        }

        if (this.sortDir) {
            return forSaleList.sort((fr, sc) => (fr.price - sc.price))
        }
        return forSaleList.sort((fr, sc) => (sc.price - fr.price))
    }

    add(newGood) {
        this.#goods.push(newGood)
    }

    remove(id) {
        this.#goods.splice(id - 1, 1)
    }

}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available)
        this.amount = amount
    }
}

class Basket {
    constructor() {
        this.goods = []
    }

    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0)
    }

    add(good, amount) {
        const indexGood = this.goods.findIndex(value => value.id === good.id)
        if (indexGood != -1) {
            this.goods[indexGood].amount += amount
        } else {
            let newGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount)
            this.goods.push(newGood)
        }
    }

    removes(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id)
        if (this.goods[index].amount - amount <= 0 || amount === 0) {
            this.goods.splice(index, 1)
        } else {
            this.goods[index].amount -= amount
        }
    }

    clear() {
        this.goods.length = 0
    }

    removeUnavailable() {
        this.goods.filter(value => value.available === false).forEach(item => this.remove(item));

    }
}

const firstProduct = new Good(1, "T-shirt", 'Black', ['L', 'XL'], 1500, true)
const secondProduct = new Good(2, "Sweater", 'White', ['L', 'XL', 'XXL'], 2500, false)
const thirdProduct = new Good(3, "Jeans", 'Blue', ['XL'], 2500, true)
const fourthProduct = new Good(4, "Blouse", 'Cyan', ['L', 'XL', 'M'], 2000, true)
const fifthProduct = new Good(5, "Cap", 'Black', ['L', 'XL', 'M', 'XS'], 500, true)

const catalog = new GoodsList(/Blouse/i, true, false)
const basketTest = new Basket()

// firstProduct.setAvailable(false)

// console.log(firstProduct)
catalog.add(firstProduct)
catalog.add(secondProduct)
catalog.add(thirdProduct)
catalog.add(fourthProduct)
catalog.add(fifthProduct)

// catalog.removes(4)

catalog.sortDir

basketTest.add(fourthProduct, 4)
basketTest.add(secondProduct, 4)
basketTest.removes(fourthProduct, 2)
// basketTest.clear()
// console.log(basketTest.removeUnavailable())

console.log(basketTest.totalAmount)
console.log(basketTest)

// console.log(catalog.list)
