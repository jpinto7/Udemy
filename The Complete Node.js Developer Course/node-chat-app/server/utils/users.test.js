const expect = require('expect');
const Users = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 234
    }, {
      id: 2,
      name: 'Lisa',
      room: 234
    }, {
      id: 3,
      name: 'Angela',
      room: 230
    }];
  });

  it('should add new user', () => {
    const user = {
      id: 123,
      name: 'Andy',
      room: 23
    };
    const users = new Users();
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const user = users.removeUser(1);
    expect(user.id).toBe(1);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const user = users.removeUser(6);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const user = users.getUser(1);
    expect(user.id).toBe(1);
  });

  it('should not find user', () => {
    const user = users.getUser(4);
    expect(user).toBeFalsy();
  });

  it('should return names for room 234', () => {
    const userList = users.getUserList(234);
    expect(userList).toEqual(['Mike', 'Lisa']);
  });

  it('should return names for room 230', () => {
    const userList = users.getUserList(230);
    expect(userList).toEqual(['Angela']);
  });
});