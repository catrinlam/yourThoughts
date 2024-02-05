from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from feedback.serializers import StudentSerializer, LoginSerializer
from feedback.models import Student
from django.contrib.auth import authenticate

class SignUpView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        student_data = serializer.validated_data['student']
        if User.objects.filter(username=student_data['email']).exists():
            return Response({"detail": "A user with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            student = serializer.save()
            Token.objects.create(user=student.student)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            return Response({"detail": "Invalid credentials"}, status=400)

# class SignUpView(generics.CreateAPIView):
#     queryset = Student.objects.all()  # Changed from User to Student
#     serializer_class = StudentSerializer
#     permission_classes = [permissions.AllowAny]
#
#     def perform_create(self, serializer):
#         student = serializer.save()
#         Token.objects.create(user=student.student)

# class LoginView(generics.GenericAPIView):
#     serializer_class = StudentSerializer
#     permission_classes = [permissions.AllowAny]
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         })


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""