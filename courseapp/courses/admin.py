from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import Category, Course, Lesson, Tag


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']
    list_filter = ['id']


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class TagInlineModel(admin.StackedInline):
    model = Course.tags.through


class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'updated_date', 'active']
    readonly_fields = ['img']
    form = CourseForm
    inlines = [TagInlineModel, ]

    def img(self, course):
        if course:
            return mark_safe(
                '<img src="/static/{url}" width="120" />'.format(url=course.image.name)
            )

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson)
admin.site.register(Tag)
