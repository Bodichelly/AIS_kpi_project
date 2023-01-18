import os
from wsgiref.util import FileWrapper
from PIL import Image

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, serializers, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from AIS_server_app.barcode_utils.barcode_generator import str_to_barcode
from AIS_server_app.barcode_utils.barcode_render import render_barcode as render
from .forms import ProductForm

from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['code', 'image_url', 'name', 'quantity', 'description']


class ProductsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def retrieve(self, request, **kwargs):
        print(request.query_params)
        print(kwargs)
        product = get_object_or_404(self.queryset, pk=kwargs.get('pk'))
        serializer = self.serializer_class(product)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print(request)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
def product_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    print(pk)
    filename = 'AIS_server_app/barcode_utils/barcode'
    render(str_to_barcode(pk), filename)
    file = open(filename + '.png', 'rb')
    response = HttpResponse(FileWrapper(file), content_type='image/png')
    return response


def index(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(status=[200])
        else:
            return HttpResponse(status=[400])
