const { dbConn, UserModel, TaskModel } = require("./models");

async function seed() {
  await dbConn.sync({ force: true })

  const alex = await UserModel.create({
    name: "Alex",
    email: "alex@example.com",
    password: "supersecret",
  });

  await TaskModel.create({ title: "Write project proposal", priority: 3, status: "todo", userId: alex.id });
  await TaskModel.create({ title: "Review pull requests", priority: 2, status: "doing", userId: alex.id });
  await TaskModel.create({ title: "Water the plants", priority: 1, status: "done", userId: alex.id },);

  const john = await UserModel.create({
    name: "John",
    email: "john@example.com",
    password: "abc123",
  });

  await TaskModel.create({ title: "Finish due essay", priority: 4, status: "doing", userId: john.id });
  await TaskModel.create({ title: "Go touch grass", priority: 1, status: "todo", userId: john.id });
  await TaskModel.create({ title: "Cook dinner", priority: 3, status: "done", userId: john.id });

  console.log("Seeded!");
  await dbConn.close();
}

seed();