from itertools import product
from unicodedata import name
from django.db import models

# Create your models here.

class product(models.Model):
    name = models.CharField(max_length=50,null=False ,blank = False)
    description = models.CharField(max_length=500 , null= False ,blank=False )
    price = models.DecimalField(max_digits=5, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class order(models.Model):
    product = models.ForeignKey(product,related_name='product',on_delete=models.PROTECT ,blank=True, null=True)
    location_to = models.CharField(max_length=50,null=False ,blank = False)
    product_at =   models.CharField(max_length=50,null=False ,blank = False)
    phoneNumber = models.CharField(max_length=50,null=False ,blank = False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)