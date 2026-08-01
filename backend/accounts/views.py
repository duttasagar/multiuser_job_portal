import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import random
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from .utils import send_otp_email
from django.core.cache import cache
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer
import traceback
User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed"
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        username = data.get("username", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        phone = data.get("phone", "").strip()
        role = data.get("role", "").strip()
        # Username validation
        if not username:
            return JsonResponse({
                "status": False,
                "field": "username",
                "message": "Username is required."
            }, status=400)

        if len(username) < 3:
            return JsonResponse({
                "status": False,
                "field": "username",
                "message": "Username must be at least 3 characters."
            }, status=400)

        # Email validation
        if not email:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Email is required."
            }, status=400)

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Enter a valid email address."
            }, status=400)

        # Phone validation
        if not phone:
            return JsonResponse({
                "status": False,
                "field": "phone",
                "message": "Phone number is required."
            }, status=400)

        if not phone.isdigit() or len(phone) != 10:
            return JsonResponse({
                "status": False,
                "field": "phone",
                "message": "Enter a valid 10-digit phone number."
            }, status=400)

        # Password validation
        if not password:
            return JsonResponse({
                "status": False,
                "field": "password",
                "message": "Password is required."
            }, status=400)

        if len(password) < 8:
            return JsonResponse({
                "status": False,
                "field": "password",
                "message": "Password must be at least 8 characters."
            }, status=400)

        # Role validation
        if not role:
            return JsonResponse({
                "status": False,
                "field": "role",
                "message": "Role is required."
            }, status=400)

        if role not in ["job_seeker", "recruiter"]:
            return JsonResponse({
                "status": False,
                "field": "role",
                "message": "Invalid role selected."
            }, status=400)

        # Check existing email
        if User.objects.filter(email=email).exists():
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Email already registered."
            }, status=400)

        # Check existing username
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                "status": False,
                "field": "username",
                "message": "Username already taken."
            }, status=400)

        # Generate OTP
        otp = str(random.randint(100000, 999999))

        # Store temporary registration data
        cache.set(
            f"register_{email}",
            {
                "username": username,
                "email": email,
                "password": password,
                "phone": phone,
                "role": role,
                "otp": otp,
            },
            timeout=300,
        )

        # Send OTP
        send_otp_email(email, otp)

        return JsonResponse({
            "status": True,
            "message": "OTP sent successfully. Please verify your email."
        }, status=200)

    except json.JSONDecodeError:
        return JsonResponse({
            "status": False,
            "field": "json",
            "message": "Invalid JSON."
        }, status=400)

    except Exception as e:
        return JsonResponse({
            "status": False,
            "message": str(e)
        }, status=500)
    

@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed"
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        # Email validation
        if not email:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Email is required."
            }, status=400)

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Enter a valid email address."
            }, status=400)

        # Password validation
        if not password:
            return JsonResponse({
                "status": False,
                "field": "password",
                "message": "Password is required."
            }, status=400)

        # Authenticate user
        user = authenticate(
            request=request,
            email=email,
            password=password
        )

        if user is None:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Invalid email or password."
                },
                status=401,
            )

        if not user.is_verified:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Please verify your email first."
                },
                status=403,
            )

        tokens = get_tokens_for_user(user)

        return JsonResponse(
            {
                "status": True,
                "message": "Login successful.",
                "access": tokens["access"],
                "refresh": tokens["refresh"],
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                }
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception as e:
        return JsonResponse(
            {
                "status": False,
                "message": str(e)
            },
            status=500,
        )


@csrf_exempt
def verify_otp(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed"
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        email = data.get("email")
        otp = data.get("otp")

        # Email validation
        if not email:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Email is required."
            }, status=400)

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({
                "status": False,
                "field": "email",
                "message": "Enter a valid email address."
            }, status=400)

        # OTP validation
        if not otp:
            return JsonResponse({
                "status": False,
                "field": "otp",
                "message": "OTP is required."
            }, status=400)

        otp = str(otp).strip()

        if not otp.isdigit():
            return JsonResponse({
                "status": False,
                "field": "otp",
                "message": "OTP must contain only digits."
            }, status=400)

        if len(otp) != 6:
            return JsonResponse({
                "status": False,
                "field": "otp",
                "message": "OTP must be 6 digits."
            }, status=400)

        # Get registration data
        registration_data = cache.get(f"register_{email}")

        if not registration_data:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "OTP expired or registration session not found."
                },
                status=400,
            )

        if registration_data["otp"] != otp:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "Invalid OTP."
                },
                status=400,
            )

        # Create verified user
        User.objects.create_user(
            username=registration_data["username"],
            email=registration_data["email"],
            password=registration_data["password"],
            phone=registration_data["phone"],
            role=registration_data["role"],
            is_verified=True,
        )

        # Remove temporary cache
        cache.delete(f"register_{email}")

        return JsonResponse(
            {
                "status": True,
                "message": "Registration completed successfully."
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception as e:
        return JsonResponse(
            {
                "status": False,
                "message": str(e)
            },
            status=500,
        )

    

@csrf_exempt
def logout(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed."
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        refresh_token = data.get("refresh")

        if not refresh_token:
            return JsonResponse(
                {
                    "status": False,
                    "field": "refresh",
                    "message": "Refresh token is required."
                },
                status=400,
            )

        token = RefreshToken(refresh_token)
        token.blacklist()

        return JsonResponse(
            {
                "status": True,
                "message": "Logout successful."
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception:
        return JsonResponse(
            {
                "status": False,
                "field": "refresh",
                "message": "Invalid or expired refresh token."
            },
            status=400,
        )


@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed."
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        email = data.get("email")

        # Required field validation
        if not email:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Email is required."
                },
                status=400,
            )

        # Email format validation
        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Enter a valid email address."
                },
                status=400,
            )

        # Check user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "No account found with this email."
                },
                status=404,
            )

        # Generate OTP
        otp = str(random.randint(100000, 999999))

        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        # Send OTP
        send_otp_email(user.email, otp)

        return JsonResponse(
            {
                "status": True,
                "message": "OTP sent successfully."
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception as e:
        print(traceback.format_exc())

        return JsonResponse(
            {
                "status": False,
                "message": "Something went wrong."
            },
            status=500,
        )


@csrf_exempt
def verify_reset_otp(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed."
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        email = data.get("email")
        otp = data.get("otp")

        # Required field validation
        if not email:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Email is required."
                },
                status=400,
            )

        if not otp:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "OTP is required."
                },
                status=400,
            )

        # Email format validation
        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Enter a valid email address."
                },
                status=400,
            )

        # Check user exists
        user = User.objects.filter(email=email).first()

        if not user:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "User not found."
                },
                status=404,
            )

        # Check OTP exists
        if not user.otp:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "No OTP found. Please request a new OTP."
                },
                status=400,
            )

        # Validate OTP
        if user.otp != otp:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "Invalid OTP."
                },
                status=400,
            )

        # Check expiry
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "OTP has expired."
                },
                status=400,
            )

        # Mark OTP verified
        cache.set(
            f"reset_verified_{email}",
            True,
            timeout=300
        )

        return JsonResponse(
            {
                "status": True,
                "message": "OTP verified successfully."
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception:
        print(traceback.format_exc())

        return JsonResponse(
            {
                "status": False,
                "message": "Something went wrong."
            },
            status=500,
        )
    
    
@csrf_exempt
def reset_password(request):
    if request.method != "POST":
        return JsonResponse(
            {
                "status": False,
                "message": "Only POST request allowed."
            },
            status=405,
        )

    try:
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        # Required field validation
        if not email:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Email is required."
                },
                status=400,
            )

        if not password:
            return JsonResponse(
                {
                    "status": False,
                    "field": "password",
                    "message": "Password is required."
                },
                status=400,
            )

        # Email format validation
        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "Enter a valid email address."
                },
                status=400,
            )

        # Password validation
        if len(password) < 8:
            return JsonResponse(
                {
                    "status": False,
                    "field": "password",
                    "message": "Password must be at least 8 characters."
                },
                status=400,
            )

        # Check user exists
        user = User.objects.filter(email=email).first()

        if not user:
            return JsonResponse(
                {
                    "status": False,
                    "field": "email",
                    "message": "User not found."
                },
                status=404,
            )

        # Check OTP verification
        verified = cache.get(f"reset_verified_{email}")

        if not verified:
            return JsonResponse(
                {
                    "status": False,
                    "field": "otp",
                    "message": "Please verify OTP first."
                },
                status=403,
            )

        # Update password
        user.set_password(password)
        user.otp = None
        user.otp_created_at = None
        user.save()

        # Remove OTP verification flag
        cache.delete(f"reset_verified_{email}")

        return JsonResponse(
            {
                "status": True,
                "message": "Password changed successfully."
            },
            status=200,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "status": False,
                "field": "json",
                "message": "Invalid JSON."
            },
            status=400,
        )

    except Exception:
        print(traceback.format_exc())

        return JsonResponse(
            {
                "status": False,
                "message": "Something went wrong."
            },
            status=500,
        )



class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("INSIDE ME VIEW")   # <-- Add this
        print(request.user)

        return Response({
            "id": request.user.id,
            "email": request.user.email,
            "role": request.user.role,
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)






