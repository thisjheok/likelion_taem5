from django.urls import re_path, path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="프로젝트 이름(예: likelion-project)",
        default_version='프로젝트 버전(예: 1.1.1)',
        description="해당 문서 설명(예: likelion-project API 문서)",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="likelion@inha.edu"), # 부가정보
        license=openapi.License(name="backend"), # 부가정보
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [    
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('home/', views.home, name='home'),
    path('workhol/', views.workhol_site, name='workhol_site'),
    path('language_study/', views.language_study_site, name='language_study_site'),
    path('intern/', views.intern_site, name='intern_site'),
    path('<str:site_name>/<str:category_name>/post/', views.create_post, name='create_post'), # post 생성
    path('<str:site_name>/<str:category_name>/postlist/', views.post_list, name='post_list'), # 수정
    path('category/list/<str:category_name>/', views.category_list, name='category_list'), # 추가 수정된 urls.py
    path('<str:site_name>/<str:category_name>/<int:id>', views.post_detail, name='post_detail'),
    path('<str:site_name>/<str:category_name>/<int:id>/update/', views.post_update, name='post_update'),
    path('<str:site_name>/<str:category_name>/<int:id>/delete/', views.post_delete, name='post_delete'),
    path('pressLike/<int:pk>/', views.press_like, name='press_like'),
    path('comments/<int:pk>', views.create_comments, name='create_comments'),
    path('delcomments/<int:pk>',views.delete_comments, name='delete_comments'),
    path('upcomments/<int:pk>',views.update_comments,name = 'update_comments'),
    path('post/comments/list/<int:id>',views.comment_detail,name="comment_detail"),
    # path('mypage/', views.mypage, name='mypage'),
    
    # Swagger url
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
