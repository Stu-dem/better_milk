from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from backend.users.models import User, Role
from backend.geography.serializers import BranchSerializer

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["name", "code"]


class UserSerializer(serializers.ModelSerializer[User]):
    roles = RoleSerializer(many=True)
    branches = BranchSerializer(many=True)
    class Meta:
        model = User
                
        fields = ["first_name", "last_name", "is_active", "email", "id", "roles", "branches"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "pk"},
        }
        


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    
    def get_cleaned_data(self):
        return {
            "first_name": self.validated_data.get("first_name", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
            "password2": self.validated_data.get("password2", ""),

        }
    