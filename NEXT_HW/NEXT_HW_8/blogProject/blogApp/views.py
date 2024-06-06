from django.shortcuts import render, redirect
from .models import Article
from .forms import ArticleForm
# Create your views here.
def new(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('list')
    else:
        form = ArticleForm()
    return render(request, 'new.html', {'form': form})        

def list(request):
    articles = Article.objects.all()
    
    hobby_count = Article.objects.hobby().count()
    food_count = Article.objects.food().count()
    programming_count = Article.objects.programming().count()
    
    return render(request, 'list.html', {
        'articles': articles,
        'hobby_count': hobby_count,
        'hobby_count': hobby_count,
        'food_count': food_count,
        'programming_count': programming_count
        })

def detail(request, article_id):
    article = Article.objects.get(id=article_id)
    return render(request, 'detail.html', {'article': article})

def category(request):
    return render(request, 'category.html')
    

def hobby_category(request):
    hobby_articles = Article.objects.hobby()
    return render(request, 'hobby_category.html', {'hobby_articles': hobby_articles}) 

def food_category(request):
    food_articles = Article.objects.food()
    return render(request, 'food_category.html', {'food_articles': food_articles})

def prgramming_category(request):
    programming_articles = Article.objects.programming()
    return render(request, 'programming_category.html', {'programming_articles': programming_articles})