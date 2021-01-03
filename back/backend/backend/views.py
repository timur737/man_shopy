from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class NineView(APIView):


    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'key':'What is going on!!!'
        })