x = 50

def funcy(x):
	print('x is:', x)
	x = 1000
	print('local x is redefined to:', x)

funcy(10)