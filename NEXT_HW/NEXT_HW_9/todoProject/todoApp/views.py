from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache
from django.utils import timezone
from .models import Post
from .forms import PostForm

@never_cache
def home(request):
    posts = Post.objects.all().order_by('deadline')
    today = timezone.now().date()
    for post in posts:
        if post.deadline:
            deadline_delta = (post.deadline - today).days
            if deadline_delta == 0:
                post.deadline = "-Day"
            elif deadline_delta < 0:
                deadline_delta = -1 * deadline_delta
                post.deadline = f"+{deadline_delta}"
            else:
                post.deadline = f"-{deadline_delta}"
    return render(request, 'home.html', {'posts': posts, 'today': today})


def new(request):
    if request.method == 'POST':
        new_post = Post.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            deadline = request.POST['deadline']
        )
        return redirect('detail', new_post.pk)
        
    return render(request, 'new.html')

def detail(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    
    return render(request, 'detail.html', {'post': post})

def update(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect('detail', post_pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'update.html', {'form': form, 'post': post})


def delete(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    post.delete()
    
    return redirect('home')


