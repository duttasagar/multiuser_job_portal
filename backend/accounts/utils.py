from django.core.mail import send_mail
from django.conf import settings


def send_otp_email(email, otp):
    send_mail(
        subject="Email Verification OTP",
        message=f"Your OTP is {otp}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )







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