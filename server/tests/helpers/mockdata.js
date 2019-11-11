
// mock data for testing purposes

module.exports = {
  account1: {
    email: 'test@gmail.com',
    passwordHash: '$2b$10$tOKa531X/IaHZncPznfUYu3es/D9MeK.JqbFZ3UJ0TS/5OEX6mUXa',
  },
  profile1: {
    name: 'Example User',
    role: {
      isUser: true,
      isAdmin: false,
    },
  },
  document1: {
    text: 'Hello, my name is Example User',
  },
  template1: {
    title: 'Introduction',
    template: 'Hello, my name is {{ name }}',
  },
};
