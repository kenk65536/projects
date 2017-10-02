# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
def home(request):
  return render(request, 'home.html')
def chinaTest(request):
  return HttpResponse('中文測試')
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
