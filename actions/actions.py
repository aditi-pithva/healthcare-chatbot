from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import openai

# Configure OpenAI API key
openai.api_key = ""  # Replace with your OpenAI API Key

class ActionGPTResponse(Action):
    def name(self) -> Text:
        return "action_gpt_response"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        # Get the latest user message
        user_message = tracker.latest_message.get("text")
        
        # Retrieve the AI Strategy and context (if available)
        ai_strategy = tracker.get_slot("ai_strategy") or "Provide a helpful response."
        
        # Compose the prompt for GPT
        prompt = f"User message: {user_message}\nAI Strategy: {ai_strategy}\nRespond appropriately for a mental health context."

        # Get GPT response
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=150,
                n=1,
                stop=None,
                temperature=0.7,
            )
            ai_response = response.choices[0].text.strip()
        except Exception as e:
            ai_response = "I'm sorry, I couldn't process your request right now. Please try again later."

        # Send the response back to the user
        dispatcher.utter_message(text=ai_response)

        # Optionally set a slot (for AI Strategy or similar)
        return [SlotSet("ai_strategy", ai_strategy)]
