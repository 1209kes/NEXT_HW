from django.db import models
from datetime import date
# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    deadline = models.DateField(null=True, default=date.today)
    
    def __str__(self):
        return f'{self.title} - {self.deadline}'