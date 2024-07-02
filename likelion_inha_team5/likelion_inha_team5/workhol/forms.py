from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import *

class SignUpForm(forms.ModelForm):
    password_confirm = forms.CharField(label="비밀번호 확인:", widget=forms.PasswordInput())

    class Meta:
        model = MyUser
        fields = ['id', 'email', 'username', 'birth_date', 'gender', 'phone_number', 'password']
        widgets = {
            'password': forms.PasswordInput(),
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'gender': forms.Select()
        }
        labels = {
            'gender': 'Gender'
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        if password and password_confirm and password != password_confirm:
            self.add_error('password_confirm', '비밀번호가 일치하지 않습니다. 알맞게 입력해주세요.')

        return cleaned_data

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="ID")

class PostForm(forms.ModelForm):
    continent = forms.ModelChoiceField(
        queryset=Continent.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'}),
        empty_label='---------'
    )
    country = forms.ModelChoiceField(
        queryset=Country.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'}),
        empty_label='---------'
    )
    class Meta:
        model = Post
        fields = ['continent', 'country', 'title', 'content', 'images']
        widgets = {
            #'continent': forms.Select(attrs={'class': 'form-control'}),
            #'country': forms.TextInput(attrs={'class': 'form-control'}),
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control'}),
            'images': forms.ClearableFileInput(attrs={'class': 'form-control-file'}),
        }

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        #self.fields['continent'].queryset = Continent.objects.all()    
    # def __init__(self, *args, **kwargs):
    #     super(PostForm, self).__init__(*args, **kwargs)
    #     self.fields['continent'].queryset = Continent.objects.all()
    #     self.fields['country'].queryset = Country.objects.all()

class CommentsForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['author', 'content']