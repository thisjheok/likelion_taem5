from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import MyUser

class SignUpForm(forms.ModelForm):
    class Meta:
        model = MyUser
        fields = ['id', 'email', 'username', 'birth_date', 'gender', 'phone_number', 'password']
        widgets = {
            'password': forms.PasswordInput(),
            'birth_date': forms.DateInput(attrs={'type': 'date'}),  # 날짜 선택 달력 추가
            
        }

    def clean_password(self):
        password = self.cleaned_data.get('password')
        # 추가적인 비밀번호 검증 로직이 필요하다면 여기에 작성
        return password
    
class Meta:
        model = MyUser
        fields = ['id', 'email', 'username', 'birth_date', 'gender', 'phone_number', 'password']
        widgets = {
            'gender': forms.RadioSelect
        }
        labels = {
            'gender': 'Gender'
        }

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="ID")  # 레이블을 "ID"로 변경