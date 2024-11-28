# Use the Rasa base image
FROM rasa/rasa:latest

# Copy project files into the container
COPY ./ /app
WORKDIR /app

# Install custom dependencies (if any)
RUN pip install -r requirements.txt

# Expose the Rasa API port
EXPOSE 5005

# Command to run the Rasa server
CMD ["rasa", "run", "--enable-api", "--cors", "*"]
