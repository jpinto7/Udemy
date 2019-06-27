import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'first_project.settings')

import django
django.setup()

import random
from first_app.models import Webpage, Topic, AccessRecord
from faker import Faker

fakegen = Faker()
topics = ['Search', 'Social', 'Marketplace', 'News']

def add_topic():
    t = Topic.objects.get_or_create(top_name=random.choice(topics))[0]
    return t

def populate(N=5):
    for entry in range(N):
        top = add_topic()

        fake_url = fakegen.url()
        fake_date = fakegen.date()
        fake_name = fakegen.company()

        web = Webpage.objects.get_or_create(name=fake_name, topic=top, url=fake_url)[0]

        acc = AccessRecord.objects.get_or_create(name=web, date=fake_date)[0]

if __name__ == '__main__':
    print('populating...')
    populate(20)
    print('population complete!')
