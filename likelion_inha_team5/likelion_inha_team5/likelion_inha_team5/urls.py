from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('workhol.urls')),  # workhol 앱의 URL들을 포함
]
