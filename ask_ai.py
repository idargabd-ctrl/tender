import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env file")

client = OpenAI(api_key=api_key)

project_description = "платформа на основе ИИ для автоматизации поиска и анализа тендеров"

prompt = f"Придумай 3 креативных названия для моего проекта: {project_description}"

print(f"Запрос: {prompt}\n")
print("Ответ от OpenAI:")
print("-" * 40)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": prompt}
    ]
)

print(response.choices[0].message.content)
