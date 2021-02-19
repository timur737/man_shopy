FROM python:3.9.1


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /back
WORKDIR /back
COPY requirements.txt /back
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . /back
RUN python manage.py makemigrations
RUN python manage.py migrate

