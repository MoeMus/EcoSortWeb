#from openai import OpenAI

#api_key = 'sk-proj-iDhQLRqh3gAIHNUCbvZ1T3BlbkFJltPnBcND9JukL7mcF5fw'
#client = OpenAI(api_key=api_key)
#import os

# Set the OpenAI API key from the environment variable
#api_key = os.environ.get("OPENAI_API_KEY")

#def test_gpt4_access():
    #try:
        #response = client.chat.completions.create(model="gpt-4o",
        #messages=[
            #{"role": "system", "content": "You are a helpful assistant."},
            #{"role": "user", "content": "Test message to verify API key and model access."}
        #])
        #print("API Key and Model Access Test Successful:")
        #print(response.choices[0].message.content)
    #except client.OpenAIError as e:
        #print(f"API Key or Model Access Test Failed: {e}")

#if __name__ == "__main__":
    #test_gpt4_access()