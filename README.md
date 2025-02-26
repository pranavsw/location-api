# location-api

curl -X POST http://localhost:3000/api/location \
     -H "Content-Type: application/json" \
     -d '{
           "latitude": 37.7749,
           "longitude": -122.4194,
           "timestamp": "2025-02-26T12:00:00Z"
         }'


node server.js



cd frontend
python3 -m http.server 8080 --bind 0.0.0.0


