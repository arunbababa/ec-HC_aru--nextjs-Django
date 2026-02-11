from django.db import migrations


def seed(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    items = [
        {"name": "クラシック Tシャツ", "description": "シンプルで着回しやすい定番Tシャツ", "price": 2980},
        {"name": "デニムジャケット", "description": "カジュアルにもキレイめにも使えるデニムジャケット", "price": 8900},
        {"name": "レザースニーカー", "description": "上質なレザーを使用したミニマルスニーカー", "price": 12800},
        {"name": "キャンバストートバッグ", "description": "大容量で丈夫なキャンバス素材のトートバッグ", "price": 3500},
        {"name": "ウールニットキャップ", "description": "秋冬の定番ウールニット帽", "price": 2200},
        {"name": "リネンシャツ", "description": "夏に涼しいリネン素材のシャツ", "price": 5900},
    ]
    for item in items:
        Product.objects.create(**item)


def unseed(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    Product.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
