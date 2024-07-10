from django.shortcuts import render
from django.http import Http404

from .serializer import ListSerializer
from .models import List

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics , status
# Create your views here.

class ListViwe(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class DetailViwe(APIView):
    def get_object(self,pk):
        try:
            list = List.objects.get(pk=pk)
        except List.DoesNotExist:
            raise Http404
        return list
    def get(self,request,pk):
        list = self.get_object(pk)
        serializer = ListSerializer(list)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def put(self,request,pk):
        list = self.get_object(pk)
        serializer = ListSerializer(list,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        list = self.get_object(pk)
        list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)