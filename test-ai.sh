#!/bin/bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the top 3 trending videos?", "regionCode": "US"}'
