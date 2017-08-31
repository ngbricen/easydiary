module.exports = function(db) {

  db.User.create({
    name: 'Brice Nguoghia',
    email: 'bricen@gmail.com',
    password_hash: 'test'
  });

  db.User.create({
    name: 'Bob',
    email: 'bricen@gmail.com',
    password_hash: 'test1'
  });

  db.Diary.create({
    title: 'Once upon a Time',
    body: 'I started a bootcamp',
    isPublic: true,
    UserId: 1
  });

  db.Diary.create({
    title: 'My Trip to Houston',
    body: 'And I thought I was going to relax....',
    isPublic: true,
    UserId: 1
  });

  db.Diary.create({
    title: 'Best food ever',
    body: 'I ventured (got lost) into a new are of the town when I stumbled upon....',
    isPublic: true,
    UserId: 2
  });

  db.Diary.create({
    title: 'My Trip to Boston',
    body: 'A beautiful city in the Northeast...',
    isPublic: true,
    UserId: 2
  });

  db.Diary.create({
    title: 'Raining in Seattle',
    body: 'It is still raining... Can you believe this?',
    isPublic: true,
    UserId: 1
  });

};