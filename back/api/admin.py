from django.contrib import admin
from .models import Product
# Register your models here.
admin.site.register(Product)


# class ProductAdmin(admin.ModelAdmin):
#     # list_display = 
#     fields = ('title', 'description', 'img', 'category', 'price')