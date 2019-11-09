
// mock data for testing purposes

module.exports = {
  account1: {
    email: 'test@gmail.com',
    passwordHash: '$2b$10$CWJDIMrmuashTs/CJ0DPZOLq8QxE5KiXPrweNmOxua5Tkc7MK0Pn2',
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
  document2: {
    text: 'This is another version of template1',
  },
  template1: {
    title: 'Introduction',
    template: 'Hello, my name is {{ name }}',
  },
};
