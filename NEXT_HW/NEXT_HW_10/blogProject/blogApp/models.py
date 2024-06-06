from django.db import models
from django.utils import timezone
# Create your models here.
CATEGORY_CHOICES = (
    ('hobby', 'Hobby'),
    ('food', 'Food'),
    ('programming', 'Programming'),
)
class ArticleManager(models.Manager):
    def hobby(self):
        return self.filter(category='hobby')
    
    def food(self):
        return self.filter(category='food')
    
    def programming(self):
        return self.filter(category='programming')
    
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='hobby')    
    objects = ArticleManager()
    
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    
    def __str__(self):
        return self.content
    
class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    
    def __str__(self):
        return self.content
    