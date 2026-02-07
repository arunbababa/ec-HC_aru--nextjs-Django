"""
URL configuration for config project.
"""

from django.http import JsonResponse
from django.urls import path


def health_check(request):
    """ヘルスチェック用エンドポイント"""
    return JsonResponse({"status": "ok", "message": "EC Shop API is running"})

urlpatterns = [
    # Health check
    path("api/health/", health_check, name="health_check"),
]
