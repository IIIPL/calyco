import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaBed, FaCouch, FaUtensils } from 'react-icons/fa';

export const RoomVisualizerPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Navigate to personal visualization route
      navigate('/room-visualization/personalVisual', { 
        state: { uploadedImage: file }
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRoomSelect = (room) => {
    console.log('Room selected:', room);
    console.log('Navigating to:', `/room-visualization/${room.name.toLowerCase().replace(/\s+/g, '')}`);
    
    // Create a clean room object without the icon function
    const cleanRoom = {
      id: room.id,
      name: room.name,
      image: room.image,
      description: room.description
    };
    
    // Navigate to specific room visualization route
    navigate(`/room-visualization/${room.name.toLowerCase().replace(/\s+/g, '')}`, {
      state: { selectedRoom: cleanRoom }
    });
  };

  const sampleRooms = [
    {
      id: 1,
      name: 'Bedroom',
      icon: FaBed,
      image: '/Assets/Rooms/Bedroom/base.webp',
      description: 'Transform your bedroom with calming colors'
    },
    {
      id: 2,
      name: 'Living Room',
      icon: FaCouch,
      image: '/Assets/Rooms/LivingRoom/base.webp',
      description: 'Create a welcoming living space'
    },
    {
      id: 3,
      name: 'Dining Room',
      icon: FaUtensils,
      image: '/Assets/Rooms/DiningRoom/base.webp',
      description: 'Design an elegant dining area'
    }
  ];

    return (
      <div className="min-h-screen bg-gray-50 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Visualize in My Room
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a sample room or upload your own photo to see how Calyco colors transform your space
          </p>
        </div>
        {/* Sample Rooms Section - Below */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Choose a Sample Room
            </h2>
            <p className="text-gray-600">
              Explore our curated room designs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample Room Cards */}
            {sampleRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRoomSelect(room);
                }}
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  {/* Room Image */}
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback if image fails to load */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center hidden">
                    {React.createElement(room.icon, { className: "text-4xl text-gray-400" })}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
                      Visualize
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-gray-600">
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Upload Section removed as requested */}

        
        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Choose Your Room</h3>
                <p className="text-sm text-gray-600">Select from our sample rooms or upload your own photo</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Select Colors</h3>
                <p className="text-sm text-gray-600">Browse our color palette and choose your favorites</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Visualize & Save</h3>
                <p className="text-sm text-gray-600">See the transformation and save your design</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
};

