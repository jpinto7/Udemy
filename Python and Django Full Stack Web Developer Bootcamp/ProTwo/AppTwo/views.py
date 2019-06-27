from django.shortcuts import render
from django.http import HttpResponse
from AppTwo.forms import UserForm

# Create your views here.

def index(request):
    return render(request, 'AppTwo/index.html')

def help(request):
    return render(request, 'AppTwo/help.html')

def users(request):
    form = UserForm()
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save(commit=True)
            return index(request)
        else:
            print('ERROR FORM INVALID')

    return render(request, 'AppTwo/users.html', {'form': form})
