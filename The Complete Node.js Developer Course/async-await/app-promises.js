const users = [{
  id: 1,
  name: 'Andy',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = id => new Promise((resolve, reject) => {
  const user = users.find(user => user.id === id);
  if (user) {
    return resolve(user);
  }
  reject(`Unable to find user with id of ${id}.`);
});

const getGrades = schoolId => new Promise((resolve, reject) => {
  const resGrades = grades.filter(grade => grade.schoolId === schoolId);
  if (resGrades.length > 0) {
    return resolve(resGrades);
  }
  reject(`Unable to find grades for schoolId of ${schoolId}.`);
});

const getStatus = userId => {
  let user;
  return getUser(userId)
    .then(tempUser => {
      user = tempUser;
      return getGrades(user.schoolId);
    })
    .then(grades => {
      const average = grades.map(grade => grade.grade).reduce((a, b) => a + b, 0) / grades.length;
      return `${user.name} has a ${average} in the class.`;
    });
};

const getStatusAlt = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  const average = grades.map(grade => grade.grade).reduce((a, b) => a + b, 0) / grades.length;
  return `${user.name} has a ${average}% in the class.`;
};

getUser(29)
  .then(user => console.log(user))
  .catch(error => console.log(error));

getGrades(101)
  .then(grades => console.log(grades))
  .catch(error => console.log(error));

getStatusAlt(1)
  .then(status => console.log(status))
  .catch(error => console.log(error));