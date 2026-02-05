"""
URL configuration for config project.
"""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def health_check(request):
    """ヘルスチェック用エンドポイント"""
    return JsonResponse({"status": "ok", "message": "EC Shop API is running"})

urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),
    # Health check
    path("api/health/", health_check, name="health_check")
]
