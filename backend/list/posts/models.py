from django.db import models

# Create your models here.

class List(models.Model):
    titel = models.CharField(max_length=50,null=False,blank=False)
    descriptiopn = models.TextField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.titel