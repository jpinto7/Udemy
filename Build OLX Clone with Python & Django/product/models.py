from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Create your models here.
class Product(models.Model):
  CONDITION_TYPE = (
    ('New', 'New'),
    ('Used', 'Used')
  )

  name = models.CharField(max_length=100)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)
  description = models.TextField(max_length=500)
  condition = models.CharField(max_length=100, choices=CONDITION_TYPE)
  price = models.DecimalField(max_digits=10, decimal_places=5)
  category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
  brand = models.ForeignKey('Brand', on_delete=models.SET_NULL, null=True)
  slug = models.SlugField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

  def save(self, *args, **kwargs):
    if not self.slug and self.name:
      self.slug = slugify(self.name)
    super(Product, self).save(*args, **kwargs)

class ProductImages(models.Model):
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  image = models.ImageField(upload_to='products/', blank=True, null=True)

  class Meta:
    verbose_name = 'Product Image'
    verbose_name_plural = 'Product Images'

  def __str__(self):
    return self.product.name

class Category(models.Model):
  name = models.CharField(max_length=50)
  image = models.ImageField(upload_to='category/', blank=True, null=True)

  class Meta:
    verbose_name = 'category'
    verbose_name_plural = 'categories'

  def __str__(self):
    return self.name

class Brand(models.Model):
  name = models.CharField(max_length=50)

  class Meta:
    verbose_name = 'brand'
    verbose_name_plural = 'brands'

  def __str__(self):
    return self.name
