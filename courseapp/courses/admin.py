from django.contrib import admin
from .models import Category, Course


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']
    list_filter = ['id']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Course)
