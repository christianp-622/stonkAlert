FROM python:3.8-slim-buster

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
ENV FLASK_APP=run.py
ENV FLASK_ENV=development
CMD [ "flask", "run", "--host=0.0.0.0"]
# ENTRYPOINT [ "python" ]

# CMD ["run.py"]