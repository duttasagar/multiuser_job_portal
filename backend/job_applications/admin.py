from django.contrib import admin

from .models import JobApplication


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "job",
        "status",
        "applied_at",
    )


    list_filter = (
        "status",
    )


    search_fields = (
        "user__email",
        "job__title",
    )