import { User } from "src/users/user.entity"
import { DataSource } from "typeorm"

export async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User)

  const users: Omit<User, "id" | "createdAt" | "updatedAt">[] = [
    {
      name: "Alice Johnson",
      username: "alice",
      email: "alice@example.com",
      password: "12345678",
    },
    {
      name: "Bob Smith",
      username: "bob",
      email: "bob@example.com",
      password: "12345678",
    },
    {
      name: "Charlie Brown",
      username: "charlie",
      email: "charlie@example.com",
      password: "12345678",
    },
    {
      name: "Diana Prince",
      username: "diana",
      email: "diana@example.com",
      password: "12345678",
    },
    {
      name: "Ethan Hunt",
      username: "ethan",
      email: "ethan@example.com",
      password: "12345678",
    },
    {
      name: "Fatemeh Bahrami",
      username: "fatemeh",
      email: "fatemeh@example.com",
      password: "12345678",
    },
    {
      name: "George Michaels",
      username: "george",
      email: "george@example.com",
      password: "12345678",
    },
    {
      name: "Hana Yazdi",
      username: "hana",
      email: "hana@example.com",
      password: "12345678",
    },
    {
      name: "Iman Rahimi",
      username: "iman",
      email: "iman@example.com",
      password: "12345678",
    },
    {
      name: "Jasmine Lee",
      username: "jasmine",
      email: "jasmine@example.com",
      password: "12345678",
    },
  ]

  for (const u of users) {
    const user = repo.create(u)
    await repo.save(user)
  }
}
