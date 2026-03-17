package com.accommodationfinder.controller;

import com.accommodationfinder.model.Room;
import com.accommodationfinder.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public List<Room> searchRooms(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Room.RoomType roomType) {
        return roomService.searchRooms(city, maxPrice, roomType);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        Room saved = roomService.save(room);
        // Broadcast new room to all connected clients via WebSocket
        messagingTemplate.convertAndSend("/topic/rooms/new", saved);
        return saved;
    }

    @PatchMapping("/{id}/availability")
    public Room updateAvailability(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        boolean available = body.get("available");
        Room updated = roomService.updateAvailability(id, available);
        // Broadcast availability change in real time
        messagingTemplate.convertAndSend("/topic/rooms/availability",
            Map.of("roomId", id, "available", available));
        return updated;
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Long id) {
        return roomService.findById(id);
    }
}
