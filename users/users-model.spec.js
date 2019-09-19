const Users = require("./users-model");
const db = require("../database/dbConfig");

describe("users model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
    // find DB_ENV in the package.json under test
  });

  // test for create
  describe("add()", () => {
    it("should add a user into the db", async () => {
      await Users.add({
        username: "lauravictoria",
        password: "cats",
        department: "student"
      });
      let users = await db("users");
      console.log(users);
      // expect(users).toHaveLength(0); // fails
      expect(users).toHaveLength(1); // passes
      //   expect(Users.username).toBe("lauravictoria"); // fails
    });
  });

  describe("remove()", () => {
    it("should remove a user from the db", async () => {
      await Users.remove;
    });
  });
});
