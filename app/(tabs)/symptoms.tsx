// app/(tabs)/symptoms.tsx
import { useState } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirstAidGuidance, GeminiResponse } from '../services/geminiServices';
import { Alert } from 'react-native';

interface SymptomData {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  aiResponse?: GeminiResponse;
}

export default function SymptomsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomData | null>(null);
  const [loading, setLoading] = useState(false);

  // Simplified list of symptoms
  const SYMPTOMS: SymptomData[] = [
    { name: 'Headache', severity: 'mild' },
    { name: 'Fever', severity: 'moderate' },
    { name: 'Minor Cuts', severity: 'mild' },
    { name: 'Stomach Ache', severity: 'moderate' },
    { name: 'Burns', severity: 'severe' },
    { name: 'Sprain', severity: 'moderate' },
    { name: 'Bee Sting', severity: 'moderate' },
    { name: 'Nosebleed', severity: 'mild' },
    { name: 'Allergic Reaction', severity: 'severe' },
    { name: 'Dehydration', severity: 'moderate' },
    { name: 'Minor Bruise', severity: 'mild' },
    { name: 'Toothache', severity: 'moderate' },
    { name: 'Sore Throat', severity: 'mild' },
    { name: 'Common Cold', severity: 'mild' },
    { name: 'Cough', severity: 'mild' },
    { name: 'Diarrhea', severity: 'moderate' },
    { name: 'Constipation', severity: 'mild' },
    { name: 'Eye Irritation', severity: 'mild' },
    { name: 'Migraine', severity: 'moderate' },
    { name: 'Muscle Pain', severity: 'mild' },
    { name: 'Back Pain', severity: 'moderate' },
    { name: 'Insect Bite', severity: 'mild' },
    { name: 'Sunburn', severity: 'moderate' },
    { name: 'Food Poisoning', severity: 'severe' },
    { name: 'Ankle Twist', severity: 'moderate' },
    { name: 'Chest Pain', severity: 'severe' },
    { name: 'Shortness of Breath', severity: 'severe' },
    { name: 'Ear Pain', severity: 'moderate' },
    { name: 'Vertigo', severity: 'moderate' },
    { name: 'Joint Pain', severity: 'moderate' },
    { name: 'Rash', severity: 'moderate' },
    { name: 'Blurred Vision', severity: 'severe' },
    { name: 'Skin Infection', severity: 'moderate' },
    { name: 'Motion Sickness', severity: 'mild' },
    { name: 'Indigestion', severity: 'mild' },
    { name: 'Knee Pain', severity: 'moderate' },
    { name: 'Swollen Feet', severity: 'moderate' },
    { name: 'Heat Exhaustion', severity: 'severe' },
    { name: 'Anxiety Attack', severity: 'severe' },
    { name: 'Hip Pain', severity: 'moderate' },
    { name: 'Wrist Pain', severity: 'moderate' },
    { name: 'Neck Pain', severity: 'moderate' },
    { name: 'Shoulder Pain', severity: 'moderate' },
    { name: 'Athlete\'s Foot', severity: 'mild' },
    { name: 'Gum Pain', severity: 'mild' },
    { name: 'Menstrual Cramps', severity: 'moderate' },
    { name: 'Acid Reflux', severity: 'moderate' },
    { name: 'Nasal Congestion', severity: 'mild' },
    { name: 'Dry Eyes', severity: 'mild' },
    { name: 'Sciatica', severity: 'moderate' },
    { name: 'Hand Numbness', severity: 'moderate' },
    { name: 'Foot Pain', severity: 'moderate' },
    { name: 'Dry Skin', severity: 'mild' },
    { name: 'Insomnia', severity: 'moderate' },
    { name: 'Jaw Pain', severity: 'moderate' },
    { name: 'Upper Back Pain', severity: 'moderate' },
    { name: 'Lower Back Pain', severity: 'moderate' },
    { name: 'Elbow Pain', severity: 'moderate' },
    { name: 'Sinus Pressure', severity: 'moderate' },
    { name: 'Seasonal Allergies', severity: 'mild' },
    { name: 'Chills', severity: 'moderate' },
    { name: 'Fatigue', severity: 'moderate' },
    { name: 'Heartburn', severity: 'moderate' },
    { name: 'Itchy Eyes', severity: 'mild' },
    { name: 'Muscle Cramps', severity: 'mild' },
    { name: 'Swollen Lymph Nodes', severity: 'moderate' },
    { name: 'Leg Cramps', severity: 'mild' },
    { name: 'Chest Congestion', severity: 'moderate' },
    { name: 'Dry Throat', severity: 'mild' },
    { name: 'Finger Pain', severity: 'mild' },
    { name: 'Heel Pain', severity: 'moderate' },
    { name: 'Laryngitis', severity: 'moderate' },
    { name: 'Morning Sickness', severity: 'moderate' },
    { name: 'Nerve Pain', severity: 'severe' },
    { name: 'Numbness', severity: 'moderate' },
    { name: 'Shin Splints', severity: 'moderate' },
    { name: 'Stiff Neck', severity: 'moderate' },
    { name: 'Tennis Elbow', severity: 'moderate' },
    { name: 'Tooth Sensitivity', severity: 'mild' },
    { name: 'Water Retention', severity: 'mild' }
  ];

  const filteredSymptoms = SYMPTOMS.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSymptomSelect = async (symptom: SymptomData) => {
    setSelectedSymptom(symptom);
    setLoading(true);

    try {
      const response = await getFirstAidGuidance(symptom.name);
      setSelectedSymptom({ ...symptom, aiResponse: response });
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to get first aid guidance. Please try again later.',
        [{ text: 'OK', onPress: () => setSelectedSymptom(null) }]
      );
    } finally {
      setLoading(false);
    }
  };

  const getSeverityStyle = (severity: SymptomData['severity']) => {
    const styles = {
      mild: { bg: 'bg-green-100', text: 'text-green-800' },
      moderate: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      severe: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    return styles[severity];
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {!selectedSymptom ? (
        <>
          {/* Search Bar */}
          <View className="p-4">
            <View className="flex-row items-center bg-white rounded-lg px-4 py-3 shadow-sm">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Search symptoms..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Symptoms List */}
          <View className="px-4">
            {filteredSymptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.name}
                className="bg-white rounded-lg p-4 mb-3 shadow-sm"
                onPress={() => handleSymptomSelect(symptom)}
              >
                <Text className="text-lg font-medium text-gray-800">{symptom.name}</Text>
                <View className="flex-row items-center mt-2">
                  <View className={`rounded-full px-3 py-1 ${getSeverityStyle(symptom.severity).bg}`}>
                    <Text className={`text-sm font-medium ${getSeverityStyle(symptom.severity).text}`}>
                      {symptom.severity.charAt(0).toUpperCase() + symptom.severity.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        // Symptom Details View with AI Response
        <View className="p-4">
          <TouchableOpacity 
            className="flex-row items-center mb-4"
            onPress={() => setSelectedSymptom(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Back to symptoms</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-4">{selectedSymptom.name}</Text>

          {loading ? (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#f4511e" />
              <Text className="mt-4 text-gray-600">Getting first aid guidance...</Text>
            </View>
          ) : selectedSymptom.aiResponse ? (
            <>
              {/* AI-Generated Warning Banner */}
              <View className="bg-blue-50 p-4 rounded-lg mb-4">
                <Text className="text-blue-800">
                  This information is AI-generated using Google's Gemini. Always consult healthcare professionals for medical advice.
                </Text>
              </View>

              {/* Warnings Section */}
              <View className="bg-red-50 p-4 rounded-lg mb-4">
                <Text className="font-bold text-red-800 mb-2">Important Warnings:</Text>
                {selectedSymptom.aiResponse.warnings.map((warning, index) => (
                  <View key={index} className="flex-row items-start mt-1">
                    <Ionicons name="warning" size={16} color="#f4511e" />
                    <Text className="ml-2 text-red-800 flex-1">{warning}</Text>
                  </View>
                ))}
              </View>

              {/* First Aid Steps */}
              <Text className="text-lg font-medium text-gray-800 mb-3">First Aid Steps:</Text>
              {selectedSymptom.aiResponse.firstAidSteps.map((step, index) => (
                <View key={index} className="flex-row items-start bg-white p-4 rounded-lg mb-2 shadow-sm">
                  <Text className="text-lg font-bold text-red-500 mr-3">{index + 1}</Text>
                  <Text className="flex-1 text-gray-600">{step}</Text>
                </View>
              ))}

              {/* General Medications */}
              <Text className="text-lg font-medium text-gray-800 my-3">Common Over-the-Counter Medications:</Text>
              {selectedSymptom.aiResponse.generalMedications.map((medication, index) => (
                <View key={index} className="bg-white p-4 rounded-lg mb-2 shadow-sm">
                  <Text className="text-gray-600">{medication}</Text>
                </View>
              ))}

              {/* Disclaimer */}
              <View className="mt-4 p-4 bg-gray-100 rounded-lg">
                <Text className="text-gray-600 italic">
                  {selectedSymptom.aiResponse.disclaimer}
                </Text>
              </View>
            </>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}