<template>
    <div class="bubble-container">
      <!-- Floating Bubble -->
      <div class="bubble" @click="toggleMenu">
        <img src="@/assets/account-icon.png" alt="Menu" />
      </div>
  
      <!-- Menu -->
      <div class="menu" :class="{ visible: menuVisible }">
        <div class="user-info" v-if="this.isLoggedIn()">
            <p>Welcome, {{ this.user.email }}</p>
        </div>
        <div class="orders">
          <h3>Your Orders</h3>
          <template v-if="orders.length > 0">
            <ul>
              <li v-for="order in orders" :key="order.id">
                <template v-if="order.id === 'food'">
                  <strong>Food Order:</strong>
                  <ul class="food-items">
                    <li v-for="food in groupedFood(order.items)" :key="food.id">
                      <span>{{ food.quantity }}x {{ food.name }}</span>
                      <span>- ${{ (food.quantity * food.price).toFixed(2) }}</span>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <strong> {{ order.movieTitle }} </strong>
                  <p>
                    <strong>Date :</strong> {{ formatDate(order.dateTimeSession) }} <br />
                    <strong>Time :</strong> {{ formatTime(order.dateTimeSession) }} <br />
                    <strong>Seats :</strong> {{ order.selectedSeats.length }}
                  </p>
                </template>
              </li>
            </ul>
          </template>
          <template v-else>
            <p>Nothing here yet. Add some sessions or food to your cart!</p>
          </template>
        </div>
        <div class="checkout-section">
          <template v-if="orders.length > 0">
            <template v-if="this.isLoggedIn()">
              <p>Enjoy exclusive offers and discounts!</p>
              <button class="checkout-button" @click="checkout()">Checkout</button>
            </template>
            <template v-else>
                <p><router-link to="/login" @click="menuVisible=false">Log in to enjoy offers and reductions</router-link>, or continue as a guest:</p>
              <button class="checkout-button" @click="checkout()">Checkout as Guest</button>
            </template>
          </template>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        menuVisible: false,
        orders: [],
        user: {
          email: null,
        },
      };
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
    
            if (this.menuVisible) {
                this.loadUser();
                this.loadOrders();
            }
        },
        loadOrders() {
            // Fetch orders from local storage, default to an empty array if no orders exist
            this.orders = JSON.parse(localStorage.getItem("Order")) || [];
            // Sort orders so that food orders are at the end
            this.orders.sort((a, b) => (a.id === 'food' ? 1 : -1));
        },
        async loadUser() {
            if (this.isLoggedIn()) {
                const token = localStorage.getItem("authToken");
                try {
                    const response = await axios.get("http://localhost:3000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                    });
                    this.user.email = response.data.user.email;
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    this.logout();
                    alert("Session expired. Please log in again.");
                }
            }
        },
        groupedFood(items) {
            const grouped = {};
            items.forEach((item) => {
            if (grouped[item.name]) {
                grouped[item.name].quantity += 1;
            } else {
                grouped[item.name] = { ...item, quantity: 1 };
            }
            });
            return Object.values(grouped);
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const options = { day: 'numeric', month: 'long' };
            return date.toLocaleDateString(undefined, options);
        },
        formatTime(dateTime) {
            const date = new Date(dateTime);
            const options = { hour: '2-digit', minute: '2-digit' };
            return date.toLocaleTimeString(undefined, options);
        },
        async checkout() {
            try {
                let total = 0;
        
                for (const order of this.orders) {
                    if (order.id !== "food") {
                    // Reserve seats for sessions
                    await axios.post(`http://localhost:3000/api/sessions/${order.id}/reserve`, {
                        seats: order.selectedSeats,
                    });
                    total += 0; // Add session price logic later
                    } else {
                    // Add food total
                    total += order.total;
                    }
                }
        
                alert(`Your payment of $${total} has been processed successfully!`);
                localStorage.removeItem("Order");
                this.orders = [];
            } catch (error) {
                console.error("Checkout failed:", error);
                alert("Checkout failed. Please try again.");
            }
        },
        isLoggedIn() {
            return !!localStorage.getItem("authToken");
        },
        logout() {
            localStorage.removeItem("authToken");
            this.user = { email: null };
            this.menuVisible = false;
            this.orders = [];
            this.$router.push("/");
        },
    },
  };
</script>


<style scoped>
.bubble-container {
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 3;
}

.bubble {
    width: 70px;
    height: 70px;
    background-color: #f50;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.bubble:hover {
    transform: scale(1.1);
}

.bubble img {
    width: 70%;
    height: 70%;
}

.menu {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 300px;
    max-height: 70vh;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 1rem;
    text-align: left;
    overflow-y: auto;

    /* Default hidden state */
    transform: translateX(100%);
    opacity: 0;
    z-index: -1;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu.visible {
    transform: translateX(0);
    opacity: 1;
    z-index: 4;
}

.menu p {
    margin: 0.5rem 0;
}

.menu h3 {
    margin: 0.5rem 0;
}

.menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu li {
    margin: 0.5rem 0;
}

.menu a {
    color: #f90;
    text-decoration: none;
}

.menu a:hover {
    text-decoration: underline;
}

.orders ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.orders li {
    
    padding: 0.5rem;
    border-bottom: 1px solid #555;
}

.food-items {
    list-style: none;
    padding-left: 1rem;
    margin: 0;
    }

.checkout-section {
    margin-top: 2rem;
}

.checkout-button {
    background-color: #f50;
    color: white;
    font-size: large;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
    width: 100%;
    text-shadow: 1px 1px 2px black;
}

.checkout-button:hover {
    background-color: #f90;
}
</style>
  