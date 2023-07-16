from datetime import datetime
import os
import json

def preprocess_movies_data(json_data):
    genres = set()  # Use a set to store unique genres
    for entry in json_data:
        date = entry["date"]
        for movie in entry["movies"]:
            # Split the date to extract month and day
            movie_date = movie["released"]
            datetime_obj = datetime.strptime(movie_date, '%d %b %Y')
            movie["Month"] = datetime_obj.strftime('%B')  # Full month name
            movie["Day"] = datetime_obj.strftime('%d')  # Day of the month
            
            # Process genres to remove duplicates and add to the set
            movie_genres = movie["genre"]
            genres.update(movie_genres)

    sorted_genres = sorted(genres)  # Convert the set to a sorted list
    return json_data, sorted_genres

from django.shortcuts import render

def movie_list(request):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    json_file_path = os.path.join(current_directory, 'movies.json')
    
    with open(json_file_path, encoding='utf-8') as json_file:
        json_data = json.load(json_file)

    json_data, sorted_genres = preprocess_movies_data(json_data)
    return render(request, 'index.html', {'json_data': json_data, 'genres': sorted_genres})
