#!/usr/bin/env bash
# Render ビルドスクリプト
# Render の Build Command にこのスクリプトを指定する
set -o errexit

export DJANGO_ENV=production

pip install -r requirements.txt

python manage.py migrate
