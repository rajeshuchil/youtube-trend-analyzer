#!/bin/bash
echo "🔍 Testing Groq AI Integration..."
echo ""
echo "Checking if Groq API key is set..."
if grep -q "GROQ_API_KEY=your_groq_api_key_here" backend/.env; then
    echo "❌ Please set your Groq API key in backend/.env"
    echo "   Visit: https://console.groq.com"
    exit 1
else
    echo "✅ Groq API key is configured"
fi

echo ""
echo "Testing AI Chat endpoint..."
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the most viewed video?", "regionCode": "US"}' \
  | python3 -m json.tool

echo ""
echo "✅ Test complete!"
