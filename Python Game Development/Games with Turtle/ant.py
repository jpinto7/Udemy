from random import *
from turtle import *
from base import Vector

ant = Vector(0, 0)
aim = Vector(2, 0)

def wrap(value):
  return value

def draw():
  ant.move(aim)
  ant.x = wrap(ant.x)
  ant.y = wrap(ant.y)
  aim.move(random() - 0.5)
  aim.rotate(random()*10 - 5)
  clear()
  goto(ant.x, ant.y)
  dot(4)
  if running:
    ontimer(draw, 60)

setup(420, 420, 370, 0)
hideturtle()
tracer(False)
up()
running = True
draw()
done()
