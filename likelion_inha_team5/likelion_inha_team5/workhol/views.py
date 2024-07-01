from django.shortcuts import render , redirect
import json
from django.http import JsonResponse
from .models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from django.contrib.auth.forms import AuthenticationForm

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to home page after signup
    else:
        form = SignUpForm()
    return render(request, 'workhol/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                purpose = user.purpose
                if purpose == '워홀':
                    return redirect('workhol_site')
                elif purpose == '어학연수':
                    return redirect('language_study_site')
                elif purpose == '인턴':
                    return redirect('intern_site')
    else:
        form = AuthenticationForm()
    return render(request, 'workhol/login.html', {'form': form})

def home(request):
    return render(request, 'workhol/home.html')

def workhol_site(request):
    return render(request, 'workhol/workhol_site.html')

def language_study_site(request):
    return render(request, 'workhol/language_study_site.html')

def intern_site(request):
    return render(request, 'workhol/intern_site.html')