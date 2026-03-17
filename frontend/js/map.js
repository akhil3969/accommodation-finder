// Leaflet.js Map Integration

let map = null;
let markers = [];

function initMap() {
    map = L.map('map').setView([48.8145, 2.3607], 13); // Center on EPITA area
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function updateMap(rooms) {
    // Clear existing markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    rooms.forEach(room => {
        if (room.latitude && room.longitude) {
            const marker = L.marker([room.latitude, room.longitude])
                .addTo(map)
                .bindPopup(`
                    <strong>${room.title}</strong><br>
                    📍 ${room.city}<br>
                    💶 €${room.price}/month<br>
                    ${room.available ? '<span style="color:green">✅ Available</span>' : '<span style="color:red">❌ Taken</span>'}
                `);
            markers.push(marker);
        }
    });

    if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
    }
}

// Initialize map on load
initMap();
updateMap([
    { title: 'Studio near EPITA', city: 'Le Kremlin-Bicêtre', price: 750, available: true, latitude: 48.8145, longitude: 2.3607 },
    { title: 'Shared Room Paris 13', city: 'Paris', price: 550, available: true, latitude: 48.8271, longitude: 2.3601 },
    { title: 'Apartment Villejuif', city: 'Villejuif', price: 950, available: false, latitude: 48.7946, longitude: 2.3656 }
]);
