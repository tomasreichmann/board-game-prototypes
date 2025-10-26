import os
import csv
import requests
import sys
from dotenv import load_dotenv
from PIL import Image, PngImagePlugin

# Load environment variables from .env.local
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env.local'))
OPENROUTER_API_KEY = os.getenv('VITE_OPENROUTER_API_KEY')

if not OPENROUTER_API_KEY:
    print("OPENROUTER_API_KEY not found in .env.local")
    sys.exit(1)

def get_image_files(input_folder):
    exts = {'.png', '.jpg', '.jpeg', '.webp', '.bmp'}
    return [f for f in os.listdir(input_folder) if os.path.splitext(f)[1].lower() in exts]

def generate_description(image_path):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    with open(image_path, "rb") as img_file:
        img_bytes = img_file.read()
    # Gemini expects base64 image, but OpenRouter may have a different API. Adjust as needed.
    import base64
    img_b64 = base64.b64encode(img_bytes).decode('utf-8')
    data = {
        "model": "google/gemini-2.0-flash-001",
        "messages": [
            {"role": "user", "content": [{"type": "image_url", "image_url": f"data:image/png;base64,{img_b64}"}, {"type": "text", "text": "Describe this image in briefly in one line of text without any formatting compatible with a CSV value."}]}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    # Extract the description from the response
    return result['choices'][0]['message']['content']

def save_prompt_metadata(img_path, prompt):
    ext = os.path.splitext(img_path)[1].lower()
    if ext == '.png':
        img = Image.open(img_path)
        meta = PngImagePlugin.PngInfo()
        meta.add_itxt("prompt", prompt)
        img.save(img_path, pnginfo=meta)
    else:
        img = Image.open(img_path)
        img.save(img_path)
    # For non-PNG, metadata is not saved

def main(input_folder):
    csv_path = os.path.join(input_folder, 'prompts.csv')
    # Read existing prompts if file exists
    prompts_dict = {}
    if os.path.isfile(csv_path):
        with open(csv_path, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                prompts_dict[row['file']] = row['prompt']
    # Process images and update prompts_dict
    for img_file in get_image_files(input_folder):
        img_path = os.path.join(input_folder, img_file)
        try:
            prompt = generate_description(img_path)
            # Ensure one line, remove quotes
            prompt_clean = prompt.replace('\n', ' ').replace('\r', ' ').replace('"', '').replace("'", '').strip()
            save_prompt_metadata(img_path, prompt_clean)
            prompts_dict[img_file] = prompt_clean
            print(f"Processed {img_file}")
        except Exception as e:
            print(f"Failed to process {img_file}: {e}")
    # Write all prompts back to CSV (overwrite)
    with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['file', 'prompt'])
        for file, prompt in prompts_dict.items():
            writer.writerow([file, prompt])

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_image_descriptions.py <input_folder>")
        sys.exit(1)
    main(sys.argv[1])
