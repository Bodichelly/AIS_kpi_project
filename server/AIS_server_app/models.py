from django.db import models

# Create your models here.

class Product(models.Model):
    code = models.CharField(max_length=36, primary_key=True)
    image_url = models.CharField(max_length=20000)
    name = models.CharField(max_length=300)
    quantity = models.IntegerField()
    description = models.TextField(max_length=3000)