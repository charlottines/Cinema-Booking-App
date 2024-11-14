<!-- FoodOrder.vue -->
<template>
    <div class="food-order">
      <h2>Order Your Food</h2>
      <div class="food-options">
        <div v-for="item in foodItems" :key="item.id" class="food-item">
          <img :src="item.image" :alt="item.name" />
          <div class="food-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="price">$ {{ item.price }}</p>
            <button @click="addToOrder(item)">Add to Order</button>
          </div>
        </div>
      </div>
      <div class="order-summary">
        <h3>Your Order Summary</h3>
        <ul>
          <li v-for="(item, index) in order" :key="index">
            {{ item.name }} - ${{ item.price }}
          </li>
        </ul>
        <p>Total: ${{ totalPrice }}</p>
        <button class="checkout-button" @click="checkout">Checkout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        foodItems: [
          { id: 1, name: 'Popcorn', description: 'Large popcorn', price: 5.00, image: 'http://www.100daysofrealfood.com/wp-content/uploads/2011/06/popcorn1.jpg' },
          { id: 2, name: 'Churros', description: '12 Churros Pack', price: 6.00, image: 'https://selfpackaging.fr/104222-large_default/boite-de-churros-a-emporter.jpg' },
          { id: 3, name: 'Candy', description: 'Assorted candy', price: 1.50, image: 'https://th.bing.com/th/id/OIP.kmenrLKE8PjPkPFhugHoxgHaE8?rs=1&pid=ImgDetMain' },
        ],
        order: [],
      };
    },
    computed: {
      totalPrice() {
        return this.order.reduce((total, item) => total + item.price, 0).toFixed(2);
      },
    },
    methods: {
      addToOrder(item) {
        this.order.push(item);
      },
      checkout() {
        alert(`Thank you for your order! Total: $${this.totalPrice}`);
        this.order = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .food-order {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .food-options {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .food-item {
    text-align: center;
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .food-item img {
    width: 100px;
    border-radius: 8px;
  }
  
  .food-details h3 {
    font-size: 1.2rem;
    color: #333;
  }
  
  .price {
    color: #ff4500;
    font-weight: bold;
  }
  
  .order-summary {
    margin-top: 2rem;
    text-align: center;
  }
  
  .checkout-button {
    background-color: #ff4500;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .checkout-button:hover {
    background-color: #e63e00;
  }
  </style>
  