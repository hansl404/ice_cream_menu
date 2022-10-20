const background = document.querySelector('body')

const flavor_dropdown = document.getElementById('dropdown-1')
const flavor_select = document.getElementById('flavors-select')
const flavor_selected = document.getElementById('flavor-selected')
const flavor_caret = document.getElementById('flavor-caret')
const flavor_list = document.querySelector('.flavors')
const flavor_options = document.querySelectorAll('.flavors li')

const toppings_dropdown = document.getElementById('dropdown-2')
const toppings_select = document.getElementById('toppings-select')
const toppings_selected = document.getElementById('toppings-selected')
const toppings_caret = document.getElementById('toppings-caret')
const toppings_list = document.querySelector('.toppings')
const toppings_options = document.querySelectorAll('.toppings li')
const toppings_none = document.getElementById('select_none')
const toppings_all = document.getElementById('select_all')

const order = document.getElementById('order-button')
const order_msg = document.getElementById('msg')

// const all_flavors = ["Vanilla", "Chocholate", "Strawberry", "Coffee", "Banana"]
const toppings_set = new Set()
background.classList.toggle('vanilla-bg')  // default
let order_state = false

// for (let i = 0; i < all_flavors.length; i++) {
//     const item = document.createElement('li')
//     item.appendChild(document.createTextNode(all_flavors[i]))
//     flavor_list.appendChild(item)
// }

// open flavors dropdown
flavor_select.addEventListener('click', () => {
    flavor_list.classList.toggle('flavors-open')
    flavor_caret.classList.toggle('caret-rotate')
})

// select each flavor
flavor_options.forEach(option => {
    option.addEventListener('click', () => {
        flavor_selected.innerText = option.innerText
        background.classList.remove(...background.classList)
        if (option.innerText === 'Vanilla') {
            background.classList.toggle('vanilla-bg')
        } else if (option.innerText === 'Chocholate') {
            background.classList.toggle('chocholate-bg')
        } else if (option.innerText === 'Strawberry') {
            background.classList.toggle('strawberry-bg')
        } else if (option.innerText === 'Coffee') {
            background.classList.toggle('coffee-bg')
        } else if (option.innerText === 'Banana') {
            background.classList.toggle('banana-bg')
        }
        flavor_options.forEach(op2 => {
            op2.classList.remove('selected-base')
        })
        option.classList.toggle('selected-base')
        // flavor_list.classList.toggle('flavors-closed')
    })
})

// function to update displayed toppings at top
function updateToppings() {
    let result = ""
    if (toppings_set.size === 0) {
        result = "None  "  // add 2 spaces since we always strip off last 2 chars
    } else {
        toppings_set.forEach(element => {
            result += element + ", "
        })
    }
    console.log(toppings_set)
    toppings_selected.innerHTML = result.substring(0, result.length - 2)
}

// open topping dropdown
toppings_select.addEventListener('click', () => {
    toppings_list.classList.toggle('toppings-open')
    toppings_caret.classList.toggle('caret-rotate')
})

// select each topping (not none/all)
toppings_options.forEach(option => {
    option.addEventListener('click', () => {
        if (option.id !== 'select_none' && option.id !== 'select_all') {
            if (option.className === 'toppings-selected') {
                toppings_set.delete(option.innerHTML)
                option.classList.remove('toppings-selected')
            } else {
                toppings_set.add(option.innerHTML)
                option.classList.toggle('toppings-selected')
            }
            updateToppings()
        }
    })
})

// specific to selecting "none"
toppings_none.addEventListener('click', () => {
    toppings_set.clear()
    console.log(toppings_set)
    toppings_options.forEach(option => {
        if (option.className === 'toppings-selected') {
            option.classList.remove('toppings-selected')
        }
    })
    toppings_selected.innerHTML = "None"
})

// specific to selecting "all"
toppings_all.addEventListener('click', () => {
    toppings_options.forEach(option => {
        if (option.innerHTML !== 'All' && option.innerHTML !== 'None') {
            toppings_set.add(option.innerHTML)
            if (option.className !== 'toppings-selected') {
                option.classList.toggle('toppings-selected')
            }
        }
    })
    console.log(toppings_set)
    updateToppings()
})

order.addEventListener('click', () => {
    background.classList.remove(...background.classList)
    background.classList.toggle('order-bg')
    if (!order_state) {
        order_msg.classList.toggle('msg-show')
        order_state = true
    } 
})
