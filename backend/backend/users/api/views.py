from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.viewsets import ViewSet


from backend.users.models import User

from .serializers import UserSerializer


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class AuthUtilsViewSet(ViewSet):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    @action(detail=False, methods=["post"])
    def existingUser(self, request):
        print("HERE")
        email = request.data.get("email")
        
        print(request.data)
        if not email:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Email is required"})
        
        user = User.objects.filter(email=email).first()

        if user:
            return Response(status=status.HTTP_200_OK, data={"user_exists": True})
        return Response(status=status.HTTP_404_NOT_FOUND, data={"user_exists": False})