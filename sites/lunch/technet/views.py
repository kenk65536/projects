# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import *
from .models import store
from .forms import nameForm
from django.views.decorators.csrf import csrf_protect
def home(request):
  return render(request, 'home.html')
def chinaTest(request):
  return HttpResponse('中文測試')
def store_list(request):
  stores = store.objects.all()
  return render(request, 'store_list.html', {'stores': stores})
def store_detail(request, pk):
  try:
    storeDetail = store.objects.get(pk = pk)
  except store.DoesNotExist:
    raise Http404
  return render(request, 'store_detail.html', {'store': storeDetail})
def welcomeForm(request):
  food = {'name':'番茄炒蛋', 'price':60, 'comment':'好吃', 'is_spicy':False}
  food1 = { 'name':'番茄炒蛋', 'price':60, 'comment':'好吃', 'is_spicy':False }
  food2 = { 'name':'蒜泥白肉', 'price':100, 'comment':'人氣推薦', 'is_spicy':True }
  foods = [food1, food2]
  #return render(request, 'welcome.html')
  return render(request, 'welcome.html', locals())
def getTest(request):
  if 'user_name' in request.GET:
    return HttpResponse('Welcome!~' + request.GET['user_name'])
  else:
    return render(request, 'welcome.html')
    #return render(request, 'welcome.html', locals())
@csrf_protect
def postTest(request):
  ctx = {}
  if request.POST:
    ctx['ans'] = request.POST['name1']
  return render(request, 'welcome.html', ctx)
  #return render(request, 'welcome.html', locals())
def add(request, a, b):
  s = int(a) + int(b)
  return HttpResponse(str(s))
def math(request, a, b):
  a = int(a)
  b = int(b)
  s = a + b
  d = a - b
  p = a * b
  q = a / b
  html = '<html>sum={s}<br>dif={d}<br>pro={p}<br>quo={q}</html>'.format(s=s, d=d, p=p, q=q)
  return HttpResponse(html)
