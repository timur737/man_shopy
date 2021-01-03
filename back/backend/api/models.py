from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    """Model definition for Product."""
    # CATEGORY_CHOICES = [
    #     ('0','Man'),
    #     ('1','Woman'),
    #     ('2','Children'),
    # ]
    class Category(models.IntegerChoices):
        MAN = 0
        WOMEN = 1
        CHILDREN = 2
    # TODO: Define fields here
    title = models.CharField(max_length=256)
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    description = models.TextField()
    img = models.ImageField(upload_to='product_img/', default=None)
    category = models.IntegerField(choices=Category.choices)
    price = models.IntegerField()

    class Meta:
        """Meta definition for Product."""

        verbose_name = 'Product'
        verbose_name_plural = 'Products'


    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Product, self).save(*args, **kwargs)


    def __str__(self):
        """Unicode representation of Product."""
        return self.title
    
