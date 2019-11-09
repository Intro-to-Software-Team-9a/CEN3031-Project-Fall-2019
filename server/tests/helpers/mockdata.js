
// mock data for testing purposes

module.exports = {
  account1: {
    email: 'test@gmail.com',
    passwordHash: 'test',
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
