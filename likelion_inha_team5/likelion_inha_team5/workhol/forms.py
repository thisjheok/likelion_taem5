from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import MyUser

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