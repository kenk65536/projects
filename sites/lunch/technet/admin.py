from django.contrib import admin
from.models import *
admin.site.register(post)
admin.site.register(get)
class menuItemInline(admin.StackedInline):
  model = MenuItem
  extra = 1
class storeAdmin(admin.ModelAdmin):
  list_display = ('name', 'notes',)
  inlines = (menuItemInline,)
admin.site.register(store, storeAdmin)
class menuItemAdmin(admin.ModelAdmin):
  list_display = ('name', 'price',)
admin.site.register(MenuItem, menuItemAdmin)
