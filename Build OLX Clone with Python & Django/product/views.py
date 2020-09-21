from django.shortcuts import render
from .models import Product

# Create your views here.
def productlist(request):
  product_list = Product.objects.all()
  context = {'product_list': product_list}
  template = 'Product/product_list.html'
  return render(request, template, context)

def productdetail(request, product_slug):
  product_detail = Product.objects.get(slug=product_slug)
  context = {'product_detail': product_detail}
  template = 'Product/product_detail.html'
  return render(request, template, context)
