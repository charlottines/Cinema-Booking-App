<template>
    <div class="prices">
      <h1 class="title">🎟 Cinema Prices & Offers</h1>
  
      <!-- Pricing Options -->
      <div class="prices-options">
        <!-- Standard Prices -->
        <div class="price-card">
          <img src="@/assets/prices/standard-prices.jpg" alt="Standard Prices" class="price-image" />
          <div class="price-details">
            <h3>Standard Prices</h3>
            <table class="prices-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in standardPrices" :key="ticket.type">
                  <td>{{ ticket.type }}</td>
                  <td>{{ ticket.price }}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Special Add-ons -->
        <div class="price-card">
          <img src="@/assets/prices/add-ons.jpg" alt="Special Add-ons" class="price-image" />
          <div class="price-details">
            <h3>Special Add-ons</h3>
            <ul>
              <li v-for="special in specialPrices" :key="special.name">
                {{ special.name }}: {{ special.price }}€
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Subscriptions -->
        <div class="price-card">
          <img src="@/assets/prices/subscription.jpg" alt="Subscriptions" class="price-image" />
          <div class="price-details">
            <h3>Subscriptions & Passes</h3>
            <ul>
              <li v-for="sub in subscriptions" :key="sub.name">
                <strong>{{ sub.name }}:</strong> {{ sub.details }}
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Special Offers -->
        <div class="price-card">
          <img src="@/assets/prices/offers.jpg" alt="Special Offers" class="price-image" />
          <div class="price-details">
            <h3>Special Offers</h3>
            <ul>
              <li v-for="offer in specialOffers" :key="offer.title">
                <strong>{{ offer.title }}:</strong> {{ offer.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        standardPrices: [
          { type: 'Adult', price: 10 },
          { type: 'Child (under 12)', price: 6 },
          { type: 'Student', price: 8 },
          { type: 'Senior (+65)', price: 7 },
          { type: 'Group (10+)', price: 7 },
        ],
        specialPrices: [
          { name: '3D', price: 2 },
          { name: '3D Glasses Rental', price: 1 },
          { name: 'IMAX', price: 4 },
          { name: 'Dolby Atmos', price: 3 },
        ],
        subscriptions: [
          { name: 'Loyalty Card', details: 'One free ticket after 10 paid entries.' },
          { name: 'Unlimited Pass', details: 'Unlimited movies for 25€/month.' },
          { name: '5 or 10 Prepaid Tickets', details: '5 tickets for 40€ or 10 tickets for 75€.' },
        ],
        specialOffers: [
          { title: 'Cinema Day', description: '6€ every Tuesday' },
          { title: 'Family Night', description: '28€ for 2 adults and 2 children' },
          { title: 'Student Offer', description: 'Reduced price on weekdays' },
          { title: 'Morning Discount', description: 'Discount for sessions before noon' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .prices {
    margin: 5rem 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    color: #ffffff;
  }
  
  .title {
    font-size: 2.5rem;
    color: #f90;
    margin-bottom: 2rem;
  }
  
  .prices-options {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  
  .price-card {
    background: #333;
    border-radius: 12px;
    overflow: hidden;
    width: 320px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .price-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.5);
  }
  
  .price-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .price-details {
    padding: 1rem;
    text-align: center;
  }
  
  .price-details h3 {
    font-size: 1.4rem;
    color: #ff6f00;
    margin-bottom: 1rem;
  }
  
  .prices-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .prices-table th,
  .prices-table td {
    border: 1px solid #555;
    padding: 0.5rem;
    text-align: center;
  }
  
  .prices-table th {
    background: #444;
    color: #ff6f00;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    color: #ddd;
    font-size: 1rem;
  }
  
  ul li {
    margin: 0.5rem 0;
  }
  
  </style>