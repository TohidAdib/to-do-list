from django.contrib import admin

from .models import List
# Register your models here.

class ListShape(admin.ModelAdmin):
    list_display = ["id","titel","descriptiopn","created_at"]

admin.site.register(List,ListShape)