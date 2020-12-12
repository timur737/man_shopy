from django.db import models

class Product(models.Model):
    """Model definition for Product."""

    # TODO: Define fields here
    title = models.CharField(max_length=256)
    description = models.TextField()
    img = models.ImageField(upload_to='product_img/', default=None)
    price = models.IntegerField()
    class Meta:
        """Meta definition for Product."""

        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        """Unicode representation of Product."""
        return self.title
