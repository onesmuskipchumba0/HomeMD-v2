// app/(tabs)/first-aid.tsx
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const firstAidData = [
    {
        condition: "Burns",
        procedures: [
            "Cool the burn with running water for at least 10 minutes.",
            "Cover the burn with a sterile, non-stick bandage.",
            "Do not apply ice or creams.",
            "Seek medical attention for severe burns."
        ]
    },
    {
        condition: "Choking",
        procedures: [
            "Encourage the person to cough if they can.",
            "Perform back blows and abdominal thrusts if necessary.",
            "Call emergency services if the obstruction is not cleared."
        ]
    },
    {
        condition: "Cuts and Wounds",
        procedures: [
            "Apply pressure to stop the bleeding.",
            "Clean the wound with water.",
            "Apply a sterile bandage.",
            "Seek medical attention if the wound is deep or infected."
        ]
    },
    {
        condition: "Fractures",
        procedures: [
            "Immobilize the injured area.",
            "Apply a splint if possible.",
            "Do not try to straighten the bone.",
            "Seek immediate medical attention."
        ]
    },
    {
        condition: "Nosebleed",
        procedures: [
            "Sit upright and lean forward slightly.",
            "Pinch the soft part of the nose for 10-15 minutes.",
            "Breathe through your mouth while holding nose.",
            "Apply cold compress to nose and face."
        ]
    },
    {
        condition: "Sprains",
        procedures: [
            "Follow RICE: Rest, Ice, Compression, Elevation.",
            "Apply ice pack for 15-20 minutes at a time.",
            "Use elastic bandage for compression.",
            "Keep the injured area elevated."
        ]
    },
    {
        condition: "Heat Exhaustion",
        procedures: [
            "Move to a cool place.",
            "Remove excess clothing.",
            "Drink plenty of water.",
            "Apply cool, wet cloths to body."
        ]
    },
    {
        condition: "Bee Sting",
        procedures: [
            "Remove the stinger if visible.",
            "Clean the area with soap and water.",
            "Apply cold compress to reduce swelling.",
            "Watch for signs of allergic reaction."
        ]
    },
    {
        condition: "Fainting",
        procedures: [
            "Lay person flat on their back.",
            "Elevate legs above heart level.",
            "Ensure there's plenty of fresh air.",
            "If no recovery in 1 minute, call emergency services."
        ]
    },
    {
        condition: "Seizures",
        procedures: [
            "Clear the area of hazards.",
            "Do not restrain the person.",
            "Place something soft under their head.",
            "Time the seizure and call emergency if over 5 minutes."
        ]
    },
    {
        condition: "Poisoning",
        procedures: [
            "Call poison control immediately.",
            "Do not induce vomiting unless told to do so.",
            "Keep the poison container for identification.",
            "Monitor vital signs until help arrives."
        ]
    },
    {
        condition: "Electric Shock",
        procedures: [
            "Do not touch person until power source is off.",
            "Check breathing and pulse.",
            "Cover any burns with sterile gauze.",
            "Seek immediate medical attention."
        ]
    },
    {
        condition: "Hypothermia",
        procedures: [
            "Move to warm, dry place.",
            "Remove wet clothing.",
            "Warm the body gradually.",
            "Provide warm beverages if conscious."
        ]
    },
    {
        condition: "Head Injury",
        procedures: [
            "Keep person still and awake.",
            "Apply cold pack to reduce swelling.",
            "Monitor for confusion or vomiting.",
            "Seek immediate medical attention."
        ]
    },
    {
        condition: "Asthma Attack",
        procedures: [
            "Help person sit upright.",
            "Assist with prescribed inhaler if available.",
            "Keep calm and encourage slow breathing.",
            "Call emergency if symptoms worsen."
        ]
    },
    {
        condition: "Diabetic Emergency",
        procedures: [
            "If conscious, give sugar source.",
            "Check blood sugar if possible.",
            "Keep person calm and comfortable.",
            "Call emergency if unconscious."
        ]
    },
    {
        condition: "Eye Injury",
        procedures: [
            "Do not rub the eye.",
            "Flush with clean water if chemical exposure.",
            "Cover eye with sterile dressing.",
            "Seek immediate medical attention."
        ]
    },
    {
        condition: "Drowning",
        procedures: [
            "Remove from water safely.",
            "Check breathing and start CPR if needed.",
            "Remove wet clothing and keep warm.",
            "Seek emergency medical care."
        ]
    },
    {
        condition: "Snake Bite",
        procedures: [
            "Keep the person still to slow venom spread.",
            "Remove any constricting items.",
            "Clean the wound gently.",
            "Seek immediate medical attention."
        ]
    },
    {
        condition: "Heart Attack",
        procedures: [
            "Call emergency services immediately.",
            "Help person sit or lie comfortably.",
            "Give aspirin if available and no allergies.",
            "Begin CPR if person becomes unconscious."
        ]
    },
    {
        condition: "Severe Bleeding",
        procedures: [
            "Apply direct pressure to wound.",
            "Use clean cloth or sterile bandage.",
            "Keep injured area elevated.",
            "Call emergency services immediately."
        ]
    },
    {
        condition: "Shock",
        procedures: [
            "Lay person flat on back.",
            "Keep warm with blanket.",
            "Raise legs if no spinal injury suspected.",
            "Call emergency services."
        ]
    },
    {
        condition: "Tooth Loss",
        procedures: [
            "Find the tooth if possible.",
            "Hold tooth by crown, not root.",
            "Rinse gently if dirty.",
            "Keep tooth in milk or saliva until reaching dentist."
        ]
    }
];

export default function FirstAidGuide() {
  const [search, setSearch] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<{condition: string, procedures: string[]} | null>(null);

  const filteredConditions = firstAidData.filter((item) =>
    item.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-50 p-4 m-4 rounded-lg">
        <View className="flex-row items-center mb-2">
          <Ionicons name="bandage" size={24} color="#f4511e" />
          <Text className="ml-2 font-bold text-gray-800">First Aid Guide</Text>
        </View>
        <Text className="text-gray-600">
          Select a condition to view recommended first aid procedures.
        </Text>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <TextInput
          className="bg-white p-3 rounded-lg border border-gray-300"
          placeholder="Search conditions..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Content */}
      <View className="p-4">
        {selectedCondition ? (
          <View>
            <TouchableOpacity
              className="flex-row items-center mb-3"
              onPress={() => setSelectedCondition(null)}
            >
              <Ionicons name="chevron-back" size={16} color="#f4511e" />
              <Text className="ml-2 text-gray-600">Back to Conditions</Text>
            </TouchableOpacity>

            <Text className="text-lg font-bold text-gray-800 mb-3">{selectedCondition.condition}</Text>
            {selectedCondition.procedures.map((procedure, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                <Text className="ml-2 text-gray-600">{procedure}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-3">Conditions</Text>
            {filteredConditions.map((item) => (
              <TouchableOpacity
                key={item.condition}
                className="flex-row items-center mb-3 bg-white p-3 rounded-lg shadow-sm"
                onPress={() => setSelectedCondition(item)}
              >
                <Ionicons name="chevron-forward" size={16} color="#f4511e" />
                <Text className="ml-2 text-gray-600">{item.condition}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
