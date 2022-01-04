FROM python:3

ADD App.py /

RUN python3 -m pip install Flask
RUN python3 -m pip install Flask-Cors
RUN python3 -m pip install numpy
RUN python3 -m pip install pandas
RUN python3 -m pip install scikit-learn
RUN python3 -m pip install matplotlib


CMD [ "python", "./App.py" ]
EXPOSE 5000