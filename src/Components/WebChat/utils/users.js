const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  console.log(user)
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id == id);
}

function userLeave(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  const userLeaving = users[userIndex];
  if (userIndex != -1) {
    users.splice(userIndex, 1);
    return userLeaving;
  }
  return false;
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
