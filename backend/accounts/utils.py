from django.conf import settings
from django.core.mail import send_mail
import traceback

def send_otp_email(email, otp):
    print("HOST:", settings.EMAIL_HOST, flush=True)
    print("PORT:", settings.EMAIL_PORT, flush=True)
    print("TLS:", settings.EMAIL_USE_TLS, flush=True)
    print("USER:", settings.EMAIL_HOST_USER, flush=True)

    try:
        sent = send_mail(
            subject="Email Verification OTP",
            message=f"Your OTP is {otp}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        print("Emails sent:", sent, flush=True)

    except Exception as e:
        print("EMAIL ERROR:", repr(e), flush=True)
        traceback.print_exc()
        raise