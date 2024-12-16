from django.db import models

# Create your models here.

class Province(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=2)

    def __str__(self):
        return self.name

class Branch(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=2)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)

    def __str__(self):
        return self.name