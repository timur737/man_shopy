# from django.contrib.auth.backends import ModelBackend

# from user.models import User

# class EmailModelBackend(ModelBackend):
#     """
#     authentication class to login with the email address.
#     """

#     def authenticate(self, request, username=None, password=None, **kwargs):

#         if '@' in username:
#             kwargs = {'email': username}
#         else:
#             return None
#         if password is None:
#             return None
#         try:
#             user = User.objects.get(**kwargs)

#         except User.DoesNotExist:
#             User.set_password(password)

#         else:
#             if user.check_password(password) and self.user_can_authenticate(user):
#                 return user




from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q


UserModel = get_user_model()


class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(
                Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        except MultipleObjectsReturned:
            return User.objects.filter(email=username).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None