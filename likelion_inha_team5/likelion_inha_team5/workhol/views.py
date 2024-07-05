from django.shortcuts import render, redirect
import json
from django.http import Response, HttpResponse, HttpResponseForbidden
from .models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, authenticate
from .forms import *
from django.contrib.auth.forms import AuthenticationForm
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


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

# 회원가입
@swagger_auto_schema(
    method="post",
    tags=["회원가입"],
    operation_summary="회원가입",
    operation_description="회원가입을 처리합니다.",
    request_body=SignUpSerializer,
    responses={
        201: '회원가입 성공',
        400: '잘못된 요청',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def signup(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)  # 회원가입 후 자동으로 로그인
        return Response({"message": "Signup successful"}, status=201)
    return Response(serializer.errors, status=400)

# 로그인
@swagger_auto_schema(
    method="post",
    tags=["로그인"],
    operation_summary="로그인",
    operation_description="로그인을 처리합니다.",
    request_body=LoginSerializer,
    responses={
        200: '로그인 성공',
        400: '잘못된 요청',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        id = serializer.validated_data.get('id')
        password = serializer.validated_data.get('password')
        user = authenticate(request, id=id, password=password) # 7/5 17:11 username=id부분 id=id로 수정
        if user is not None:
            user.last_login = timezone.now()  # 마지막 로그인 시간 갱신
            user.save()
            login(request, user)
            return Response({"message": "로그인 성공"}, status=200)  # 로그인 성공 메시지 반환
        else:
            return Response({"error"}, status=403) # 오류 확인위해 추가
    return Response({"error": "Invalid credentials"}, status=400)

# 홈
@swagger_auto_schema(
    method="get",
    tags=["홈"],
    operation_summary="홈 페이지",
    operation_description="홈 페이지를 렌더링합니다.",
    responses={
        200: '홈 페이지 렌더링 성공',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def home(request):
    return render(request, 'workhol/home.html')

# 워킹홀리데이 사이트
@swagger_auto_schema(
    method="get",
    tags=["워킹홀리데이"],
    operation_summary="워킹홀리데이 사이트",
    operation_description="워킹홀리데이 사이트를 렌더링합니다.",
    responses={
        200: '워킹홀리데이 사이트 렌더링 성공',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def workhol_site(request):
    return render(request, 'workhol/workhol_site.html')

# 언어학습 사이트
@swagger_auto_schema(
    method="get",
    tags=["언어학습"],
    operation_summary="언어학습 사이트",
    operation_description="언어학습 사이트를 렌더링합니다.",
    responses={
        200: '언어학습 사이트 렌더링 성공',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def language_study_site(request):
    return render(request, 'workhol/language_study_site.html')

# 인턴 사이트
@swagger_auto_schema(
    method="get",
    tags=["인턴"],
    operation_summary="인턴 사이트",
    operation_description="인턴 사이트를 렌더링합니다.",
    responses={
        200: '인턴 사이트 렌더링 성공',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def intern_site(request):
    return render(request, 'workhol/intern_site.html')

# 게시물 생성
@swagger_auto_schema(
    method="post",
    tags=["게시물"],
    operation_summary="게시물 생성",
    operation_description="새로운 게시물을 생성합니다.",
    request_body=PostSerializer,
    responses={
        201: '게시물 생성 성공',
        400: '잘못된 요청',
        500: '서버 오류'
    }
)
@api_view(['POST'])
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

    if not Continent.objects.exists():
        for code, name in initial_continents:
            Continent.objects.create(continent_name=code)

    site, _ = Site.objects.get_or_create(site_name=site_name)
    category, _ = Category.objects.get_or_create(category_name=category_name)
    site_category, _ = SiteCategory.objects.get_or_create(site=site, category=category)

    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.save(author=request.user, site=site, category=category, site_category=site_category)
        request.user.point += 50
        request.user.save()
        return Response({"message": "Post created successfully"}, status=201)
    return Response(serializer.errors, status=400)

# 게시물 목록
@swagger_auto_schema(
    method="get",
    tags=["게시물"],
    operation_summary="게시물 목록",
    operation_description="게시물 목록을 가져옵니다.",
    responses={
        200: '게시물 목록 가져오기 성공',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def post_list(request, site_name, category_name):
    site = get_object_or_404(Site, site_name=site_name)
    category = get_object_or_404(Category, category_name=category_name)
    posts = Post.objects.filter(site=site, category=category)
    return render(request, 'workhol/post_list.html', {'posts': posts, 'site_name': site_name, 'category_name': category_name})

# 게시물 상세보기
@swagger_auto_schema(
    method="get",
    tags=["게시물"],
    operation_summary="게시물 상세보기",
    operation_description="게시물 상세 정보를 가져옵니다.",
    responses={
        200: '게시물 상세보기 성공',
        404: '게시물 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['GET'])
def post_detail(request, site_name, category_name, id):
    site = get_object_or_404(Site, site_name=site_name)
    category = get_object_or_404(Category, category_name=category_name)
    post = get_object_or_404(Post, site=site, category=category, id=id)
    return render(request, 'workhol/post_detail.html', {'post': post})

# 게시물 수정
@swagger_auto_schema(
    method="post",
    tags=["게시물"],
    operation_summary="게시물 수정",
    operation_description="게시물을 수정합니다.",
    request_body=PostSerializer,
    responses={
        200: '게시물 수정 성공',
        403: '권한 없음',
        404: '게시물 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def post_update(request, site_name, category_name, id):
    post = get_object_or_404(Post, id=id, site__site_name=site_name, category__category_name=category_name)
    if request.user != post.author:
        return HttpResponseForbidden("You are not allowed to update this post")

    serializer = PostSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Post updated successfully"}, status=200)
    return Response(serializer.errors, status=400)

# 게시물 삭제
@swagger_auto_schema(
    method="post",
    tags=["게시물"],
    operation_summary="게시물 삭제",
    operation_description="게시물을 삭제합니다.",
    responses={
        200: '게시물 삭제 성공',
        403: '권한 없음',
        404: '게시물 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def post_delete(request, site_name, category_name, id):
    post = get_object_or_404(Post, id=id, site__site_name=site_name, category__category_name=category_name)
    if request.user != post.author:
        return HttpResponseForbidden("You are not allowed to delete this post")

    post.delete()
    return Response({"message": "Post deleted successfully"}, status=200)

# 좋아요 누르기 기능 추가
@swagger_auto_schema(
    method="patch",
    tags=["게시물"],
    operation_summary="좋아요 누르기",
    operation_description="게시물에 좋아요를 누릅니다.",
    responses={
        200: '좋아요 성공',
        404: '게시물 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['PATCH'])
def press_like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.likes += 1  # 좋아요 수를 1 증가
    post.save()
    return Response({'message': f'{pk}의 총 좋아요 수는 {post.likes}입니다.'}, status=status.HTTP_200_OK)

# 댓글 작성 기능 추가
@swagger_auto_schema(
    method="post",
    tags=["댓글"],
    operation_summary="댓글 작성",
    operation_description="게시물에 댓글을 작성합니다.",
    request_body=CommentsSerializer,
    responses={
        201: '댓글 작성 성공',
        400: '잘못된 요청',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def create_comments(request, pk):
    post = get_object_or_404(Post, pk=pk)
    serializer = CommentsSerializer(data=request.data)
    if serializer.is_valid():
        comments = serializer.save(post=post, author=request.user)
        request.user.point += 10
        request.user.save()
        return Response({"message": "Comment added successfully"}, status=201)
    return Response(serializer.errors, status=400)

# 댓글 삭제 기능 추가
@swagger_auto_schema(
    method="post",
    tags=["댓글"],
    operation_summary="댓글 삭제",
    operation_description="게시물의 댓글을 삭제합니다.",
    responses={
        200: '댓글 삭제 성공',
        403: '권한 없음',
        404: '댓글 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def delete_comments(request, pk):
    comments = get_object_or_404(Comments, pk=pk)
    if request.user != comments.author:
        return HttpResponseForbidden("You are not allowed to delete this comment")

    comments.delete()
    return Response({"message": "Comment deleted successfully"}, status=200)

# 댓글 수정 기능 추가
@swagger_auto_schema(
    method="post",
    tags=["댓글"],
    operation_summary="댓글 수정",
    operation_description="게시물의 댓글을 수정합니다.",
    request_body=CommentsSerializer,
    responses={
        200: '댓글 수정 성공',
        403: '권한 없음',
        404: '댓글 찾을 수 없음',
        500: '서버 오류'
    }
)
@api_view(['POST'])
def update_comments(request, pk):
    comments = get_object_or_404(Comments, pk=pk)
    if request.user != comments.author:
        return HttpResponseForbidden("You are not allowed to update this comment")

    serializer = CommentsSerializer(comments, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Comment updated successfully"}, status=200)
    return Response(serializer.errors, status=400)

# 회원정보 기능 추가
@swagger_auto_schema(
    method="get",
    tags=["회원정보"],
    operation_summary="회원정보 확인",
    operation_description="회원정보와 작성한 글, 댓글을 확인합니다.",
    responses={
        200: '회원정보 확인 성공',
        500: '서버 오류'
    }
)
@api_view(['GET', 'POST'])
@login_required
def mypage(request):
    user = request.user
    posts = Post.objects.filter(author=user)
    comments = Comments.objects.filter(author=user)

    if request.method == 'POST':
        serializer = UserProfileSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"}, status=200)
        return Response(serializer.errors, status=400)
    return render(request, 'workhol/mypage.html', {'posts': posts, 'comments': comments})
