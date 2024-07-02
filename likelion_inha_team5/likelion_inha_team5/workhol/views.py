from django.shortcuts import render , redirect
import json
from django.http import JsonResponse, HttpResponse
from .models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from django.contrib.auth.forms import AuthenticationForm
from django.utils import timezone
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import *

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializer import *

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            id = form.cleaned_data.get('id')
            password = form.cleaned_data.get('password')
            user = authenticate(id=id, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'workhol/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                user.last_login = timezone.now()  # 마지막 로그인 시간 갱신
                user.save()
                login(request, user)
                return redirect('home')  # 로그인 후 이동할 페이지
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def home(request):
    return render(request, 'workhol/home.html')

def workhol_site(request):
    return render(request, 'workhol/workhol_site.html')

def language_study_site(request):
    return render(request, 'workhol/language_study_site.html')

def intern_site(request):
    return render(request, 'workhol/intern_site.html')


# 사이트 이름과 카테고리 이름 매핑
SITE_NAME_MAPPING = {
    'intern': '해외취업',
    'language-study': '어학연수',
    'working-holiday': '워킹홀리데이',
}

CATEGORY_NAME_MAPPING = {
    'community': '커뮤니티',
    'group-buying': '공구',
    'agency-document': '대행, 서류작성',
    'info': '정보',
}

def create_post(request, site_name, category_name):
    initial_continents = [
        ('AS', '아시아'),
        ('EU', '유럽'),
        ('NA', '북아메리카'),
        ('SA', '남아메리카'),
        ('AF', '아프리카'),
        ('OC', '오세아니아'),
        ('ME', '중동')
    ]

    # Continent 객체가 없을 경우 생성
    if not Continent.objects.exists():
        for code, name in initial_continents:
            Continent.objects.create(continent_name=code)

    site_name_kr = SITE_NAME_MAPPING.get(site_name)
    category_name_kr = CATEGORY_NAME_MAPPING.get(category_name)
    
    site, _ = Site.objects.get_or_create(site_name=site_name)
    category, _ = Category.objects.get_or_create(category_name=category_name)
    site_category,_ =SiteCategory.objects.get_or_create(site=site,category=category)

    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.site = site
            post.category = category
            post.site_category = site_category
            #post.author = request.user
            post.save()
            return redirect('post_list', site_name=site_name, category_name=category_name)
        else:
            print(form.errors)
    else:
        form = PostForm()

    context = {
        'form': form,
        'site_name': site_name,
        'category_name': category_name,
    }
    return render(request, 'workhol/create_post.html', context)


# 좋아요 누르기 기능 추가
@api_view(['PATCH'])
def press_like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.likes += 1  # 좋아요 수를 1 증가
    post.save()
    return Response({'message': f'{pk}의 총 좋아요 수는 {post.likes}입니다.'}, status=status.HTTP_200_OK)