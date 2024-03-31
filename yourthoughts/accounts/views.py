from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from feedback.serializers import StudentSerializer, MyTokenObtainPairSerializer
from feedback.models import Student
from rest_framework_simplejwt.views import TokenObtainPairView


class SignUp(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user_data = serializer.validated_data['user']
        if User.objects.filter(email=user_data['email']).exists():
            raise ValidationError({"detail": "A user with this email already exists"})
        else:
            student = serializer.save()
            Token.objects.create(user=student.user)

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer

class Profile(generics.RetrieveUpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        student = Student.objects.get(user=request.user)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

"""Admin only views"""
class ListUsers(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAdminUser]

class CreateUser(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        user_data = serializer.validated_data['user']
        if User.objects.filter(email=user_data['email']).exists():
            raise ValidationError({"detail": "A user with this email already exists"})
        else:
            student = serializer.save()
            Token.objects.create(user=student.user)

class DeleteUser(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, *args, **kwargs):
        try:
            student = self.get_object()
            user = student.user
            student.delete()
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Student.DoesNotExist:
            raise NotFound(detail="Student not found")


# class EditUser(generics.UpdateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [permissions.AllowAny]