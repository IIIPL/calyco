// src/utils/filterRooms.js
export const filterRoomsByFamily = (roomFamily, roomData) => {
    return roomData.filter(room => room.roomFamily === roomFamily);
};
