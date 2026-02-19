import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "J. Jonah Jameson",  birthday: "1950-03-15", salary: 250000 },
    { name: "Peter Parker",      birthday: "1995-08-10", salary: 28000 },
    { name: "Mary Jane Watson",  birthday: "1995-02-25", salary: 32000 },
    { name: "Eddie Brock",       birthday: "1988-07-04", salary: 31000 },
    { name: "Robbie Robertson",  birthday: "1955-11-12", salary: 95000 },
    { name: "Betty Brant",       birthday: "1997-05-30", salary: 30000 },
    { name: "Flash Thompson",    birthday: "1995-09-19", salary: 29000 },
    { name: "Harry Osborn",      birthday: "1994-12-07", salary: 75000 },
    { name: "Ned Leeds",         birthday: "1996-04-22", salary: 28500 },
    { name: "Glory Grant",       birthday: "1993-06-18", salary: 33000 },
  ];

  for (const employee of employees) {
    try {
      const result = await createEmployee(employee);
      console.log("Inserted:", result);
    } catch (err) {
      console.error("Failed to insert:", employee.name, err.message);
    }
  }
}