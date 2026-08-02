from django.conf import settings
from django.core.mail import send_mail
import traceback

def send_otp_email(email, otp):
    try:
        send_mail(
            subject="Email Verification OTP",
            message=f"Your OTP is {otp}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as e:
        print("EMAIL ERROR:", repr(e))
        traceback.print_exc()
        raise






# from django.core.mail import send_mail
# from django.conf import settings

# def send_otp_email(email, otp):
#     print("EMAIL HOST:", settings.EMAIL_HOST)
#     print("EMAIL PORT:", settings.EMAIL_PORT)
#     print("EMAIL USER:", settings.EMAIL_HOST_USER)
#     print("EMAIL TLS:", settings.EMAIL_USE_TLS)
#     send_mail(
#         subject="Email Verification OTP",
#         message=f"Your OTP is {otp}",
#         from_email=settings.EMAIL_HOST_USER,
#         recipient_list=[email],
#         fail_silently=False,
#     )