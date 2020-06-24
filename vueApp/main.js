Vue.component('product', {

    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
        
    <div id="product" class="product">

    <div class="product-image">
        <img v-bind:src="image">
    </div>

    <div class="product-info">
        <h1> <a :href="url">{{ title }}</a> </h1>

        <!-- if and else statements -->
        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">Almost Out of Stock</p>
        <p v-else>Out of Stock</p>
        <p>User is premium : {{ premium }}</p>

        <!-- show /hide  same as style= "display:none" -->
        <!-- <p v-show="inStock">Promotion</p> -->

        <ul>
            <li v-for="detail in details"> {{ detail }} </li>
        </ul>

        <!-- for multiple items in list or array -->
        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        <!-- v-on or the @ sign -->
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart </button>

        <div class="cart">
            <p> Cart ({{ cart }})</p>

        </div>


    </div>

    <!-- <h1>{{ product + " is clean" }}</h1> -->
</div>

    `,
    data() {
        return {
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
            
             }
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

var app = new Vue ({
    el: '#app',
    data: {
        premium: true
    }

})