// app/(tabs)/index.tsx
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface QuickActionProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}

const QuickAction = ({ title, description, icon, href }: QuickActionProps) => (
  <Link href={href} asChild>
    <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg mb-3 shadow-sm">
      <View className="bg-red-50 p-3 rounded-full">
        <Ionicons name={icon} size={24} color="#f4511e" />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <Text className="text-gray-600">{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  </Link>
);

export default function HomeTab() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Disclaimer Banner */}
      <View className="bg-red-50 p-4 m-4 rounded-lg">
        <View className="flex-row items-center mb-2">
          <Ionicons name="warning" size={24} color="#f4511e" />
          <Text className="ml-2 font-bold text-gray-800">Important Notice</Text>
        </View>
        <Text className="text-gray-600">
          This app provides basic first aid information only. For emergencies, always call your local emergency services immediately.
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Quick Actions</Text>
        <QuickAction
          title="Check Symptoms"
          description="Find first aid advice for common symptoms"
          icon="medical"
          href="/(tabs)/symptoms"
        />
        <QuickAction
          title="First Aid Guide"
          description="Step-by-step first aid procedures"
          icon="bandage"
          href="/(tabs)/first-aid"
        />
        <QuickAction
          title="Emergency Contacts"
          description="Quick access to emergency numbers"
          icon="call"
          href="/(tabs)/emergency"
        />
      </View>

      {/* Emergency Warning Signs */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Seek Immediate Help For:</Text>
        {[
          "Difficulty breathing or shortness of breath",
          "Chest or upper abdominal pain or pressure",
          "Fainting, sudden dizziness, weakness",
          "Changes in vision",
          "Confusion or changes in mental status",
          "Any sudden or severe pain"
        ].map((symptom) => (
          <View key={symptom} className="flex-row items-center mb-2">
            <Ionicons name="alert-circle" size={16} color="#f4511e" />
            <Text className="ml-2 text-gray-600">{symptom}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}