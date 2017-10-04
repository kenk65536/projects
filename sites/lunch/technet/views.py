# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import *
from .models import store
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
