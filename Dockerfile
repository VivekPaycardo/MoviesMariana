# Use the official Ubuntu image as the base
FROM ubuntu:20.04

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libpq-dev

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file and install dependencies
COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt



# Copy the Django app files to the container
COPY . /app/

# Expose the port that your Django app will listen on (e.g., 8000)
EXPOSE 8282

# Start the Django development server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8282"]
