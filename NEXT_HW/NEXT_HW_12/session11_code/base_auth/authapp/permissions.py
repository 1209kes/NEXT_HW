from functools import wraps
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseForbidden

def is_owner_or_admin(request, obj):
    return obj.creator == request.user or request.user.is_superuser

def check_is_creator_or_admin(model_cls, lookup_field="pk"):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            obj_id = kwargs.get(lookup_field)
            if not obj_id:
                return HttpResponseForbidden("Object ID not found.")
                
            obj = get_object_or_404(model_cls, **{"pk": obj_id})

            if not request.user.is_authenticated:
                # 사용자가 로그인하지 않은 경우, error.html로 리디렉션
                return render(request, "error.html", {"error": "You must be logged in to perform this action."})
            
            if not is_owner_or_admin(request, obj):
                # 작성자가 아닌 경우 처리
                return render(request, "error.html", {"error": "You do not have permission to delete this."})

            return view_func(request, *args, **kwargs)

        return _wrapped_view

    return decorator

