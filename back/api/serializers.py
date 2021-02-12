from .models import Product
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from djoser.serializers import UserSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'img', 'category', 'price')


class UserRegistrationSerializer(BaseUserRegistrationSerializer):

    auth_token = serializers.SerializerMethodField()

    class Meta(BaseUserRegistrationSerializer.Meta):
        # User._meta.get_field('email')._unique = True
        # User.is_active = True
        fields = ('id','first_name', 'last_name','password', 'email', 'auth_token', 'phone')

    def get_auth_token(self, user):
        auth_token = Token.objects.create(user=user)
        return auth_token.key


class UserLoginSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id','first_name', 'last_name', 'email', 'auth_token', 'phone')


class UserMe(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id','first_name', 'last_name', 'email', 'auth_token', 'phone')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'phone')

        def update(self, instance, validated_data):
            user = self.context['request'].user
            if user.pk != instance.pk:
                raise serializers.ValidationError({"authorize": "You dont have permission for this user."})

            instance.first_name = validated_data['first_name']
            instance.phone = validated_data['phone']
            instance.last_name = validated_data['last_name']
            instance.email = validated_data['email']



class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance