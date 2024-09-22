const users = [
  {
    email: "team8@email.com",
    password: "password",
  },
];

export const getUserByEmail = (email: any) => {
  const found = users.find((user) => user.email === email);
  return found;
};
