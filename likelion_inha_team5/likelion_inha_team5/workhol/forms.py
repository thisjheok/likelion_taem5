from django import forms
from .models import MyUser

class SignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'birth_date', 'gender', 'phone_number', 'password', 'purpose']
