from django.core.management.base import BaseCommand
from workhol.models import Continent, Country

class Command(BaseCommand):
    help = 'Initialize continents and countries'

    def handle(self, *args, **options):
        initial_data = {
            'AS': ['한국', '일본', '중국'],
            'EU': ['프랑스', '독일', '영국'],
            'NA': ['미국', '캐나다', '멕시코'],
            'SA': ['브라질', '아르헨티나', '칠레'],
            'AF': ['나이지리아', '에티오피아', '이집트'],
            'OC': ['호주', '뉴질랜드', '피지'],
            'ME': ['사우디아라비아', '이란', '이라크']
        }

        for continent_code, countries in initial_data.items():
            continent, created = Continent.objects.get_or_create(continent_name=continent_code)
            for country_name in countries:
                Country.objects.get_or_create(continent=continent, country_name=country_name)

        self.stdout.write(self.style.SUCCESS('Successfully initialized continents and countries'))
