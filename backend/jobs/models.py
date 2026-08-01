from django.db import models
from companies.models import Company


class Job(models.Model):

    JOB_TYPES = (
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("internship", "Internship"),
        ("contract", "Contract"),
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)

    salary = models.CharField(max_length=100, blank=True, null=True)
    experience = models.CharField(max_length=50)

    # New fields
    vacancies = models.PositiveIntegerField(default=1)
    skills = models.TextField(blank=True)

    job_type = models.CharField(max_length=20, choices=JOB_TYPES)

    deadline = models.DateField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title