# Generated by Django 5.0.9 on 2024-12-14 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geography', '0001_initial'),
        ('users', '0002_remove_user_name_user_first_name_user_last_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Role name')),
                ('description', models.CharField(max_length=255, verbose_name='Role description')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='branches',
            field=models.ManyToManyField(related_name='users', to='geography.branch'),
        ),
        migrations.AddField(
            model_name='user',
            name='roles',
            field=models.ManyToManyField(related_name='users', to='users.role'),
        ),
    ]
