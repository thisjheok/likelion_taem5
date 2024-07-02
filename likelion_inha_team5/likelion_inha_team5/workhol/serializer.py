from rest_framework import serializers
from .models import *

# class PostCreateSerializer(serializers.ModelSerializer):
#     CONTINENT_CHOICES = [
#         ('아시아', '아시아'),
#         ('유럽', '유럽'),
#         ('북아메리카', '북아메리카'),
#         ('남아메리카', '남아메리카'),
#         ('아프리카', '아프리카'),
#         ('오세아니아', '오세아니아'),
#         ('중동', '중동'),
#     ]
#     continent = models.CharField(max_length=2, choices=CONTINENT_CHOICES, unique=True)
#     country = models.CharField(max_length=255, unique=True)

#     class Meta:
#         model = Post
#         fields = ['continent', 'country', 'title', 'content', 'images']
