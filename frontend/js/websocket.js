// Real-Time WebSocket Connection (STOMP over SockJS)

let stompClient = null;

function connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    stompClient.debug = null; // Disable verbose logs

    stompClient.connect({}, function(frame) {
        updateConnectionStatus(true);

        // Subscribe to room availability updates
        stompClient.subscribe('/topic/rooms/availability', function(message) {
            const update = JSON.parse(message.body);
            handleRoomUpdate(update);
        });

        // Subscribe to new room listings
        stompClient.subscribe('/topic/rooms/new', function(message) {
            const newRoom = JSON.parse(message.body);
            prependRoom(newRoom);
        });
    }, function(error) {
        updateConnectionStatus(false);
        // Retry connection after 5 seconds
        setTimeout(connectWebSocket, 5000);
    });
}

function handleRoomUpdate(update) {
    // Update room card in real time without full page refresh
    const card = document.getElementById(`room-${update.roomId}`);
    if (card) {
        const badge = card.querySelector('.badge-available, .badge-taken');
        if (badge) {
            badge.className = update.available ? 'badge-available' : 'badge-taken';
            badge.textContent = update.available ? '✅ Available' : '❌ Taken';
        }
    }
}

function prependRoom(room) {
    const list = document.getElementById('roomList');
    const card = document.createElement('div');
    card.className = 'room-card';
    card.innerHTML = `<h3>🆕 ${room.title}</h3><div class="city">📍 ${room.city}</div><div class="price">€${room.price}/month</div><span class="badge-available">✅ Available</span>`;
    list.prepend(card);
}

function updateConnectionStatus(connected) {
    const dot = document.getElementById('connection-status');
    const text = document.getElementById('status-text');
    dot.className = `status-dot ${connected ? 'connected' : 'disconnected'}`;
    text.textContent = connected ? 'Live updates active' : 'Reconnecting...';
}

// Connect on load
connectWebSocket();
