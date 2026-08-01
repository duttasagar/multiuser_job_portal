# jobs/admin.py
from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "company",
        "location",
        "job_type",
        "vacancies",
        "is_active",
        "created_at",
    )
    list_filter = ("job_type", "is_active")
    search_fields = ("title", "company__name", "skills")