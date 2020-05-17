import collections
import math
import os

def path(filename):
  filepath = os.path.realpath(__file__)
  dirpath = os.path.dirname(filepath)
  return os.path.join(dirpath, filename)

def line(a, b, x, y):
  import turtle
  turtle.up()
  turtle.goto(a, b)
  turtle.down()
  turtle.goto(x, y)

class Vector(collections.Sequence):
  PRECISION = 6
  __slots__ = ('_x', '_y', '_hash')

  def __init__(self, x, y):
    self._hash = None
    self._x = round(x, self.PRECISION)
    self._y = round(y, self.PRECISION)

  @property
  def x(self):
    return self._x

  @x.setter
  def x(self, value):
    if self._hash is not None:
      raise ValueError('Cannot set x after hashing')
    self._x = round(value, self.PRECISION)

  @property
  def y(self):
    return self._y

  @y.setter
  def y(self, value):
    if self._hash is not None:
      raise ValueError('Cannot set y after hashing')
    self._y = round(value, self.PRECISION)

  def __hash__(self):
    if self._hash is None:
      pair = (self.x, self.y)
      self._hash = hash(pair)
    return self._hash
  
  def __len__(self):
    return 2
  
  def __getitem__(self, index):
    if index == 0:
      return self.x
    elif index == 1:
      return self.y
    else:
      raise IndexError
  
  def copy(self):
    return type(self)(self.x, self.y)

  def __eq__(self, other):
    if isinstance(other, Vector):
      return self.x == other.x and self.y == other.y
    return NotImplemented

  def __ne__(self, other):
    if isinstance(other, Vector):
      return self.x != other.x and self.y != other.y
    return NotImplemented

  def __iadd__(self, other):
    if self._hash is not None:
      raise ValueError('Cannot add vector after hashing')
    elif isinstance(other, Vector):
      self.x += other.x
      self.y += other.y
    else:
      self.x += other
      self.y += other
    return self

  def __add__(self, other):
    copy = self.copy()
    return copy.__iadd__(other)

  __radd__ = __add__

  def move(self, other):
    self.__iadd__(other)

  def __isub__(self, other):
    if self._hash is not None:
      raise ValueError('Cannot subtract vector after hashing')
    elif isinstance(other, Vector):
      self.x -= other.x
      self.y -= other.y
    else:
      self.x -= other
      self.y -= other
    return self

  def __sub__(self, other):
    copy = self.copy()
    return copy.__isub__(other)

  def __imul__(self, other):
    if self._hash is not None:
      raise ValueError('Cannot multiply vector after hashing')
    elif isinstance(other, Vector):
      self.x *= other.x
      self.y *= other.y
    else:
      self.x *= other
      self.y *= other
    return self

  def __mul__(self, other):
    copy = self.copy()
    return copy.__imul__(other)

  __rmul__ = __mul__

  def scale(self, other):
    self.__imul__(other)
  
  def __itruediv__(self, other):
    if self._hash is not None:
      raise ValueError('Cannot divide vector after hashing')
    elif isinstance(other, Vector):
      self.x /= other.x
      self.y /= other.y
    else:
      self.x /= other
      self.y /= other
    return self    

  def __truediv__(self, other):
    copy = self.copy()
    return copy.__itruediv__(other)

  def __neg__(self):
    copy = self.copy()
    copy.x = -copy.x
    copy.y = -copy.y
    return copy

  def __abs__(self):
    return (self.x**2 + self.y**2)**0.5
  
  def rotate(self, angle):
    if self._hash is not None:
      raise ValueError('Cannot rotate vector after hashing')
    radians = angle*math.pi/180.0
    cosine = math.cos(radians)
    sine = math.sin(radians)
    x = self.x
    y = self.y
    self.x = x*cosine - y*sine
    self.y = y*cosine + x*sine    

  def __repr__(self):
    name = type(self).__name__
    x = self.x
    y = self.y
    return f'{name} ({x!r}, {y!r})'
