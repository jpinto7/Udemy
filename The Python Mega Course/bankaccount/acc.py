class Account:
  def __init__(self, filepath):
    self.filepath = filepath
    with open(self.filepath, 'r') as file:
      self.balance = int(file.read())

  def withdraw(self, amount):
    self.balance -= amount

  def deposit(self, amount):
    self.balance += amount

  def commit(self):
    with open(self.filepath, 'w') as file:
      file.write(str(self.balance))

class Checking(Account):
  type = 'checking'
  def __init__(self, filepath, fee = 0):
    self.fee = fee
    super().__init__(filepath)

  def transfer(self, account, amount):
    self.withdraw(amount - self.fee)
    account.deposit(amount)

account = Account('balance.txt')
print(account.balance)
account.withdraw(100)
account.commit()
print(account.balance)
checking = Checking('balance.txt')
checking.deposit(10000)
print(checking.balance)
