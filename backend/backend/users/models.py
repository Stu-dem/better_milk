
from typing import ClassVar

from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db.models import EmailField, ManyToManyField, Model
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from .managers import UserManager
from backend.geography.models import Branch


class Role(Model):
    """
    Role model for Better Milk Admin Backend.
    """

    name = CharField(_("Role name"), max_length=255, unique=True)
    code = CharField(_("Role code"), max_length=255, unique=True, blank=True, null=True)
    description = CharField(_("Role description"), max_length=255)

    def __str__(self) -> str:
        """Return role name as string representation.

        Returns:
            str: Role name.

        """
        return self.name


class User(AbstractUser):
    """
    Default custom user model for Better Milk Admin Backend.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # First and last name do not cover name patterns around the globe
    first_name = CharField(_("User first name"), blank=True, max_length=255)
    last_name = CharField(_("User last name"), blank=True, max_length=255)
    email = EmailField(_("email address"), unique=True)
    username = None  # type: ignore[assignment]
    branches = ManyToManyField(Branch, related_name="users")
    roles = ManyToManyField("Role", related_name="users")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: ClassVar[UserManager] = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})
