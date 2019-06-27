from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.http import HttpResponse
from django.core.urlresolvers import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from basic_app.models import School

app_name = 'basic_app'

class IndexView(TemplateView):
    template_name = 'index.html'

class SchoolListView(ListView):
    model = School
    context_object_name = 'schools'

class SchoolDetailView(DetailView):
    model = School
    context_object_name = 'school_detail'

class SchoolCreateView(CreateView):
    fields = ('name', 'principal', 'location')
    model = School

class SchoolUpdateView(UpdateView):
    fields = ('name', 'principal')
    model = School

class SchoolDeleteView(DeleteView):
    model = School
    success_url = reverse_lazy('basic_app:list')
