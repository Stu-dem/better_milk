from rest_framework import serializers

from backend.geography.models import Branch


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["name", "code"]