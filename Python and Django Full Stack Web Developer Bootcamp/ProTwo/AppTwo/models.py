from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    email = models.EmailField(max_length=264, unique=True)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
