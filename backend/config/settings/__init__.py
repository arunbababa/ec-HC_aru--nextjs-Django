import os

env = os.getenv("DJANGO_ENV", "development")

if env == "production":
    from config.settings.production import *  # noqa: F401, F403
else:
    from config.settings.development import *  # noqa: F401, F403
