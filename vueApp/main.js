var app = new Vue ({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        url: 'https://vuejs.org',
        inventory: 8,
        
        details: ["80% cotton","20% polyester","Gender-neutral"],
        variants: [
            {  
                variantId: 2234 ,
                variantColor: "green",
                variantImage: 'images/vmSocks-green-onWhite.jpg',
                variantQuantity: 0

            },
            {  
                variantId: 2235 ,
                variantColor: "blue",
                variantImage: 'images/vmSocks-blue-onWhite.jpg',
                variantQuantity: 10

            }
        ],
        cart: 0
        
         },
         
        methods: {
            addToCart: function () {
                this.cart += 1
            },

            updateProduct: function (index) {
                this.selectedVariant = index
                console.log(index)
            },

    },
    computed: {
        title(){
            return this.brand + " " + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }

    }
})