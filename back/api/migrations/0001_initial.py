# Generated by Django 3.1.4 on 2021-02-14 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('slug', models.SlugField(editable=False, max_length=100, unique=True)),
                ('description', models.TextField()),
                ('img', models.ImageField(default=None, upload_to='product_img/')),
                ('category', models.IntegerField(choices=[(0, 'Man'), (1, 'Women'), (2, 'Children')])),
                ('price', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
            },
        ),
    ]
