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
    UserId: 1
  });

  db.Diary.create({
    title: 'My Trip to Houston',
    body: 'And I thought I was going to relax....',
    isPublic: true,
    UserId: 1
  });

  db.Diary.create({
    title: 'Best food even',
    body: 'My doggy ate my homework. He chewed it up,” I said. But when I offered my excuse My teacher shook her head. I saw this wasn’t going well. I didn’t want to fail. Before she had a chance to talk, I added to the tale: “Before he ate, he took my work And tossed it in a pot. He simmered it with succotash Till it was piping hot. “He scrambled up my science notes With eggs and bacon strips, Along with sautéed spelling words And baked potato chips. “He then took my arithmetic And had it gently fried. He broiled both my book reports With pickles on the side. “He wore a doggy apron As he cooked a notebook stew. He barked when I objected. There was nothing I could do.” “Did he wear a doggy chef hat?” She asked me with a scowl. “He did,” I said. “And taking it Would only make him growl.” My teacher frowned, but then I said As quickly as I could, “He covered it with ketchup, And he said it tasted good.” “A talking dog who likes to cook?” My teacher had a fit. She sent me to the office, And that is where I sit. I guess I made a big mistake In telling her all that. ’Cause I don’t have a doggy. It was eaten by my cat.',
    isPublic: true,
    UserId: 1
  });

};