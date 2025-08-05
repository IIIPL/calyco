// src/data/roomData.js
import { flatColors } from './flatColors';  // Importing color data

export const roomData = [
  {
    roomFamily: "bedroom",
    name: "Serene Bedroom Retreat",
    image: "https://blog.buyerselect.com/wp-content/uploads/2020/06/bedroom-decorating-ideas.jpg",
    description: "Create a peaceful and relaxing sanctuary with soft hues and subtle elegance. Perfect for unwinding after a long day.",
    colors: ["Serene Ivory", "Blush Petal", "Silk Taupe"],  // Colors from flatColors.js
    moreInfo: "/more/bedroom",  // Optional links to more content
    recommendedUse: "Bedroom, Hallways",
    opacity: "Ultra Flat Solid",
    styling: "Calming"
  },
  {
    roomFamily: "kitchen",
    name: "Modern Minimalist Kitchen",
    image: "/Assets/kitchen.jpg",
    description: "A sleek, functional kitchen with modern finishes and a minimalist color palette for a clean and open feel.",
    colors: ["Morning Dew", "Dusky Sand", "Misty Fog"],  // Colors from flatColors.js
    moreInfo: "/more/kitchen",  // Optional links to more content
    recommendedUse: "Kitchen, Dining Room",
    opacity: "Semi-Transparent",
    styling: "Sleek"
  },
  {
    roomFamily: "living-room",
    name: "Cozy Living Room",
    image: "/Assets/living-room.jpg",
    description: "Transform your living space into a cozy haven with warm tones and soft textures that make you feel right at home.",
    colors: ["Greige Harmony", "Dusky Sand", "Sage Whisper"],  // Colors from flatColors.js
    moreInfo: "/more/living-room",  // Optional links to more content
    recommendedUse: "Living Room, Family Room",
    opacity: "Semi-Solid",
    styling: "Warm"
  },
  {
    roomFamily: "office",
    name: "Productive Home Office",
    image: "/Assets/office.jpg",
    description: "Boost your productivity in a well-organized office space with energizing yet calming tones.",
    colors: ["Silk Taupe", "Sage Whisper", "Misty Fog"],  // Colors from flatColors.js
    moreInfo: "/more/office",  // Optional links to more content
    recommendedUse: "Office, Study Room",
    opacity: "Solid",
    styling: "Contemporary"
  },
  {
    roomFamily: "bathroom",
    name: "Serene Spa Bathroom",
    image: "/Assets/bathroom.jpg",
    description: "Create a relaxing bathroom that feels like a spa with soothing cool tones and soft textures.",
    colors: ["Misty Fog", "Morning Dew", "Sage Whisper"],  // Colors from flatColors.js
    moreInfo: "/more/bathroom",  // Optional links to more content
    recommendedUse: "Bathroom, Ceilings",
    opacity: "Ultra Flat Solid",
    styling: "Tranquil"
  },
  {
    roomFamily: "dining-room",
    name: "Elegant Dining Room",
    image: "/Assets/dining-room.jpg",
    description: "Impress your guests with an elegant dining area featuring a balanced color palette that complements any occasion.",
    colors: ["Peach Glow", "Silk Taupe", "Greige Harmony"],  // Colors from flatColors.js
    moreInfo: "/more/dining-room",  // Optional links to more content
    recommendedUse: "Dining Room, Kitchen",
    opacity: "Solid",
    styling: "Luxurious"
  },
  {
    roomFamily: "nursery",
    name: "Playful Nursery",
    image: "/Assets/nursery.jpg",
    description: "Brighten up your baby's nursery with playful, calming colors that stimulate joy and creativity.",
    colors: ["Blush Petal", "Sage Whisper", "Lilac Veil"],  // Colors from flatColors.js
    moreInfo: "/more/nursery",  // Optional links to more content
    recommendedUse: "Nursery, Kids Room",
    opacity: "Translucent",
    styling: "Gentle"
  },
  {
    roomFamily: "hallway",
    name: "Welcoming Hallway",
    image: "/Assets/hallway.jpg",
    description: "Your hallway is the first impression of your home. Use welcoming colors and statement lighting to make it shine.",
    colors: ["Serene Ivory", "Peach Glow", "Sage Whisper"],  // Colors from flatColors.js
    moreInfo: "/more/hallway",  // Optional links to more content
    recommendedUse: "Hallways, Entryway",
    opacity: "Ultra Flat Solid",
    styling: "Inviting"
  },
  {
    roomFamily: "entryway",
    name: "Charming Entryway",
    image: "/Assets/entryway.jpg",
    description: "Make a lasting first impression with a stylish entryway that welcomes guests and adds character to your home.",
    colors: ["Almond Mist", "Morning Dew", "Silk Taupe"],  // Colors from flatColors.js
    moreInfo: "/more/entryway",  // Optional links to more content
    recommendedUse: "Entryway, Hallways",
    opacity: "Solid",
    styling: "Classic"
  },
  {
    roomFamily: "study",
    name: "Serene Study Room",
    image: "/Assets/study-room.jpg",
    description: "Focus and relax in a serene study room where neutral colors enhance concentration and creativity.",
    colors: ["Greige Harmony", "Silk Taupe", "Dusky Sand"],  // Colors from flatColors.js
    moreInfo: "/more/study-room",  // Optional links to more content
    recommendedUse: "Study Room, Office",
    opacity: "Semi-Solid",
    styling: "Minimalist"
  },
  {
    roomFamily: "game-room",
    name: "Entertainment Game Room",
    image: "/Assets/game-room.jpg",
    description: "Bring the fun to your entertainment room with colors that inspire energy and creativity.",
    colors: ["Blush Petal", "Silk Taupe", "Peach Glow"],  // Colors from flatColors.js
    moreInfo: "/more/game-room",  // Optional links to more content
    recommendedUse: "Game Room, Living Room",
    opacity: "Solid",
    styling: "Vibrant"
  },
  {
    roomFamily: "library",
    name: "Cozy Library",
    image: "/Assets/library.jpg",
    description: "A cozy library perfect for reading, with rich and neutral tones that make the space feel inviting.",
    colors: ["Sage Whisper", "Misty Fog", "Greige Harmony"],  // Colors from flatColors.js
    moreInfo: "/more/library",  // Optional links to more content
    recommendedUse: "Library, Study Room",
    opacity: "Semi-Solid",
    styling: "Calming"
  }
];
