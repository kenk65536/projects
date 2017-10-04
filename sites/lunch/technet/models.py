from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
class post(models.Model):
  author = models.ForeignKey(User)
  title = models.CharField(max_length=200)
  text = models.TextField()
  created_date = models.DateTimeField(default=timezone.now)
  published_date = models.DateTimeField(blank=True, null=True)
  def publish(self):
    self.published_date = timezone.now()
    self.save()
  def __str__(self):
    return self.title
class store(models.Model):
  name = models.CharField(max_length=20)
  notes = models.TextField(blank=True, default='')
  def __str__(self):
    return self.name
class MenuItem(models.Model):
  store = models.ForeignKey('Store', related_name='menu_item')
  name = models.CharField(max_length=20)
  price = models.IntegerField()
  def __str__(self):
    return self.name
