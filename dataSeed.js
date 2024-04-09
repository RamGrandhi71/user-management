const mongoose = require('mongoose');
const User = require('./index'); // Assuming you have a User model defined

mongoose.connect("mongodb+srv://abhiramgrandhi:abhirobo@cluster0.0cj5va6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userData = [
  {
    name: 'John Doe',
    username: 'johndoe',
    age: 25,
    email: 'john@example.com',
    phone: '1234567890',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    username: 'janesmith',
    age: 30,
    email: 'jane@example.com',
    phone: '9876543210',
    password: 'test123'
  },
  {
    name: 'Alice Johnson',
    username: 'alicejohnson',
    age: 28,
    email: 'alice@example.com',
    phone: '5551234567',
    password: 'alicepwd'
  }
];

async function seedUsers() {
  try {
    await User.deleteMany();
    
    await User.insertMany(userData);

    console.log('Data seeding completed successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedUsers();
