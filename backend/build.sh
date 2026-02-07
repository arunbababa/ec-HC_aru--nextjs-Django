#!/usr/bin/env bash
# Render ビルドスクリプト
# Render の Build Command にこのスクリプトを指定する
set -o errexit

pip install -r requirements.txt

python manage.py migrate
