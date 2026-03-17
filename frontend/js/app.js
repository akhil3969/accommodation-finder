// Accommodation Finder - Main App Logic

const API_BASE = 'http://localhost:8080/api';

async function searchRooms() {
    const city = document.getElementById('city').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const roomType = document.getElementById('roomType').value;

    let url = `${API_BASE}/rooms?`;
    if (city) url += `city=${encodeURIComponent(city)}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;
    if (roomType) url += `roomType=${roomType}`;

    try {
        const response = await fetch(url);
        const rooms = await response.json();
        displayRooms(rooms);
        updateMap(rooms);
    } catch (err) {
        // Backend not connected yet - show demo data
        displayRooms(getDemoRooms());
    }
}

function displayRooms(rooms) {
    const list = document.getElementById('roomList');
    document.getElementById('live-count').textContent = `${rooms.length} rooms available`;

    if (rooms.length === 0) {
        list.innerHTML = '<p class="loading">No rooms found. Try different filters.</p>';
        return;
    }

    list.innerHTML = rooms.map(room => `
        <div class="room-card" id="room-${room.id}">
            <h3>${room.title}</h3>
            <div class="city">📍 ${room.city} — ${room.roomType}</div>
            <div class="price">€${room.price}/month</div>
            <div>${room.sizeSqm ? room.sizeSqm + ' m²' : ''}</div>
            <span class="${room.available ? 'badge-available' : 'badge-taken'}">
                ${room.available ? '✅ Available' : '❌ Taken'}
            </span>
            ${room.available ? `<br><button class="btn-book" onclick="bookRoom(${room.id})">Book Now</button>` : ''}
        </div>
    `).join('');
}

function bookRoom(roomId) {
    alert(`Booking request sent for room #${roomId}! Landlord will be notified.`);
    // TODO: POST to /api/bookings
}

// Demo data for frontend testing without backend
function getDemoRooms() {
    return [
        { id: 1, title: 'Cozy Studio near EPITA', city: 'Le Kremlin-Bicêtre', price: 750, sizeSqm: 22, available: true, roomType: 'STUDIO', latitude: 48.8145, longitude: 2.3607 },
        { id: 2, title: 'Shared Room Paris 13', city: 'Paris', price: 550, sizeSqm: 15, available: true, roomType: 'SHARED', latitude: 48.8271, longitude: 2.3601 },
        { id: 3, title: 'Modern Apartment Villejuif', city: 'Villejuif', price: 950, sizeSqm: 35, available: false, roomType: 'APARTMENT', latitude: 48.7946, longitude: 2.3656 }
    ];
}

// Load demo data on page load
window.onload = () => displayRooms(getDemoRooms());
