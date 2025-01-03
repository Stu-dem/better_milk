from django.contrib import admin

from .models import Branch, Province

# Register your models here.
admin.site.register(Province)
admin.site.register(Branch)
