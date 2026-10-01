const API_BASE = `${import.meta.env.https://gearshare-e-commerce-1.onrender.com/ || ''}/api`;

export const api = {
  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Gear
  async getGear(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/gear?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch gear');
    return res.json();
  },

  async getGearById(id) {
    const res = await fetch(`${API_BASE}/gear/${id}`);
    if (!res.ok) throw new Error('Failed to fetch gear details');
    return res.json();
  },

  async createGear(gearData) {
    const res = await fetch(`${API_BASE}/gear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gearData)
    });
    if (!res.ok) throw new Error('Failed to list gear');
    return res.json();
  },

  async updateGear(id, data) {
    const res = await fetch(`${API_BASE}/gear/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update gear');
    return res.json();
  },

  async deleteGear(id) {
    const res = await fetch(`${API_BASE}/gear/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete gear');
    return res.json();
  },

  async addReview(gearId, reviewData) {
    const res = await fetch(`${API_BASE}/gear/${gearId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  // Bookings
  async getBookings(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/bookings?${query}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json();
  },

  async updateBookingStatus(id, status) {
    const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update booking status');
    return res.json();
  },

  // GearAI Kit Scout
  async askGearAi(prompt) {
    const res = await fetch(`${API_BASE}/ai/scout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) throw new Error('AI query failed');
    return res.json();
  },

  // Users & Auth
  async getUsers() {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async login(email) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async sendContactMessage(messageData) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not send your message. Please try again.');
    return data;
  }
};
