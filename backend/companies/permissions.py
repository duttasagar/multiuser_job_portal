from rest_framework.permissions import BasePermission


class IsRecruiter(BasePermission):
    """
    Only recruiters can access company APIs.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "recruiter"
        )