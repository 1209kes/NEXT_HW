# Generated by Django 5.0.3 on 2024-04-03 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogApp', '0006_alter_article_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='hobby',
            field=models.TextField(null=True),
        ),
    ]
