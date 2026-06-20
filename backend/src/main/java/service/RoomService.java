package com.accommodationfinder.service;

import com.accommodationfinder.model.Room;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    private final List<Room> rooms = new ArrayList<>();

    public List<Room> searchRooms(String city, BigDecimal maxPrice, Room.RoomType roomType) {
        return rooms;
    }

    public Room save(Room room) {
        if (room.getAvailable() == null) {
            room.setAvailable(true);
        }
        rooms.add(room);
        return room;
    }

    public Room updateAvailability(Long id, boolean available) {
        for (Room room : rooms) {
            if (room.getId() != null && room.getId().equals(id)) {
                room.setAvailable(available);
                return room;
            }
        }
        throw new RuntimeException("Room not found");
    }

    public Room findById(Long id) {
        for (Room room : rooms) {
            if (room.getId() != null && room.getId().equals(id)) {
                return room;
            }
        }
        throw new RuntimeException("Room not found");
    }
}
