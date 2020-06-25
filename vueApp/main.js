var eventBus = new Vue()

Vue.component('product-details',{
    props: {
        details:{
            type: Array,
            required: true
        }
    },
    template: `
       
            <ul>
                <li v-for="detail in details"> {{ detail }} </li>
            </ul>
        
    `
})      

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
                <p> Shipping : {{ shipping }}</p>

                <!-- show /hide  same as style= "display:none" -->
                <!-- <p v-show="inStock">Promotion</p> -->

                    <!-- add Vue component product details component -->  
                
                    <product-details :details="details" ></product-details>

                <!-- for multiple items in list or array -->
                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>
                
                <div>
                    <!-- v-on or the @ sign -->
                    <button v-on:click="addToCart"
                            :disabled="!inStock"
                            :class="{ disabledButton: !inStock }">Add to Cart </button>

                    <button v-on:click="removeFromCart"
                    
                    >Remove from Cart </button>
                </div>

                <product-tabs :reviews="reviews"></product-tabs>

            



            

    <!-- <h1>{{ product + " is clean" }}</h1> -->
</div>
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
         
            reviews: []
        }
    },
         
        methods: {
            addToCart: function () {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },

            updateProduct: function (index) {
                this.selectedVariant = index
                console.log(index)
            },

            removeFromCart: function () {
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
            }

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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }

            return 2.99
        }

    },

    //lifcycle hook called mounted
    //code you want to run as soon as the event is mounted

    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }

})

Vue.component('product-review', {
    template:   `

        <!-- For one way binding use v-bind -->
        <!-- For 2 two way bind use v-model -->
        <!-- @submit.prevent makes the page not refresh -->
        <form class="review-form" @submit.prevent="onSubmit">
            

            <p v-if="errors.length">
                <b>Please correct the following error(s)</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>

            </p>
        
            <p>
                <label for="name">Name:</label>
                <input v-model="name" id="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea name="review" id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select name="rating" id="rating" v-model.number="rating">
                    <option >5</option>
                    <option >4</option>
                    <option >3</option>
                    <option >2</option>
                    <option >1</option>


                </select>
            </p>

            <p>
                <input type="submit" value="Submit" >
            </p>
            
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },

    methods: {
        onSubmit() {

            //form validation check required fields
            if(this.name && this.review && this.rating) {
                //to create a variable
            let productReview = {
                name : this.name,
                review: this.review,
                rating: this.rating
            }
            
            //to reset data after submitting
            eventBus.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null

            
            }
            else {
                if(!this.name) this.errors.push(" Name required.")
                if(!this.rating) this.errors.push(" Rating required.")
                if(!this.review) this.errors.push(" Review required.")
            }

        }
    }
})

Vue.component('product-tabs', {

    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `

            <div>
                 <hr>
                <span class="tab"
                        :class="{ activeTab: selectedTab === tab }"
                        v-for="(tab, index) in tabs" 
                        :key="index"
                        @click="selectedTab = tab"
                        >
                        {{ tab }} </span>
           

            <div v-show="selectedTab === 'Reviews'">
                    
            <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>{{ review.rating }}</p> 
                        <p>{{ review.review }}</p>  

                        </li>
                    </ul>
            </div>
            <product-review v-show="selectedTab === 'Make a Review'"
            ></product-review>
        </div>
     

    `,

    data() {

        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'

        }
    }
})

var app = new Vue ({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },

    methods: {
        updateCart(id) {
            this.cart.push(id)
        },

        deleteFromCart(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                }
              }
        }
    }

})