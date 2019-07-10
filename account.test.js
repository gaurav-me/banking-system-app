const Account = require("./account");

jest.spyOn(global.console, "log");

describe("Bank account", () => {
  it("basic test", () => {
    expect(1).toEqual(1);
  });
  describe("Deposit should update user's balance", () => {
    it("should update user's balance attribute", () => {
      const userAccount = new Account("testUser");
      const addAmount = 500;
      const newBalance = userAccount.deposit(addAmount);
      expect(userAccount.balance).toEqual(500);
      expect(newBalance).toEqual(500);
    });
  });

  describe("Withdrawal", () => {
    it("should throw error if withdrawal amount is greater than current balance", () => {
      const userAccount = new Account("testUser");
      const withdrawalAmount = 1;
      const oldBalance = userAccount.balance;
      expect(() => {
        userAccount.withdrawal(withdrawalAmount);
      }).toThrowError("You do not have sufficient balance.");
      expect(userAccount.balance).toEqual(oldBalance);
    });
    it("should return the deducted balance if withdrawal amount is less than initial balane", () => {
      const userAccount = new Account("testUser", 100);
      const withdrawalAmount = 1;
      const newBalance = userAccount.withdrawal(withdrawalAmount);
      expect(newBalance).toEqual(99);
      expect(userAccount.balance).toEqual(newBalance);
    });

    it("should return zero if balance is equal to withdrawal amount", () => {
      const userAccount = new Account("testUser", 100);
      const withdrawalAmount = 100;
      const newBalance = userAccount.withdrawal(withdrawalAmount);
      expect(newBalance).toEqual(0);
      expect(userAccount.balance).toEqual(newBalance);
    });

    it("should throw error if input is not integer", () => {
      const userAccount = new Account("testUser");
      const depositAmount = "5";
      expect(() => {
        userAccount.deposit(depositAmount);
      }).toThrowError("incorrect input");
    });
  });

  describe("statement", () => {
    it("should return empty string if there are no activities", () => {
      const userAccount = new Account("testUser", 0);
      userAccount.statement();
      expect(console.log).toHaveBeenCalledWith("Date Amount Balance");
    });

    it("should return an array of transaction of previous deposit", () => {
      const userAccount = new Account("testUser");
      const newBalance = userAccount.deposit(50);
      const history = userAccount.statement();

      expect(history).toEqual("Date Amount Balance\nWed Jul 10 2019 50 50");
    });

    it("should return the balance", () => {
      const balance = 100;
      const userAccount = new Account("testUser", balance);
      expect(userAccount.balance).toEqual(balance);
    });

    it("should return balance as zero if no balance parameter provided", () => {
      const userAccount = new Account("testUser");
      expect(userAccount.balance).toEqual(0);
    });
  });
});
