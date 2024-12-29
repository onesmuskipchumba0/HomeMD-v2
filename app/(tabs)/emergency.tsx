// app/(tabs)/emergency.tsx
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as Linking from 'expo-linking';

interface Contact {
  name: string;
  number: string;
}

export default function EmergencyContacts() {
  const [customContacts, setCustomContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const predefinedContacts = [
    { name: "Ambulance", number: "911" },
    { name: "Fire Department", number: "112" },
    { name: "Police", number: "999" },
    { name: "Poison Control", number: "1-800-222-1222" }
  ];

  const addContact = () => {
    if (customContacts.length >= 2) {
      Alert.alert("Limit Reached", "You can only add up to 2 emergency contacts.");
      return;
    }
    if (!name || !number) {
      Alert.alert("Invalid Input", "Please provide both name and number.");
      return;
    }
    setCustomContacts([...customContacts, { name, number }]);
    setName('');
    setNumber('');
  };

  const callNumber = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-50 p-4 m-4 rounded-lg">
        <View className="flex-row items-center mb-2">
          <Ionicons name="call" size={24} color="#f4511e" />
          <Text className="ml-2 font-bold text-gray-800">Emergency Contacts</Text>
        </View>
        <Text className="text-gray-600">
          Save these important numbers for quick access during emergencies.
        </Text>
      </View>

      {/* Predefined Contacts */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Important Numbers</Text>
        {predefinedContacts.map((contact) => (
          <View key={contact.name} className="flex-row items-center mb-3">
            <Ionicons name="alert" size={16} color="#f4511e" />
            <Text className="ml-2 text-gray-800 font-semibold">{contact.name}:</Text>
            <Text className="ml-1 text-gray-600">{contact.number}</Text>
            <TouchableOpacity
              className="ml-auto bg-red-50 p-2 rounded-lg"
              onPress={() => callNumber(contact.number)}
            >
              <Ionicons name="call" size={16} color="#f4511e" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Custom Contacts */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Your Emergency Contacts</Text>
        {customContacts.map((contact, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <Ionicons name="person" size={16} color="#4caf50" />
            <Text className="ml-2 text-gray-800 font-semibold">{contact.name}:</Text>
            <Text className="ml-1 text-gray-600">{contact.number}</Text>
            <TouchableOpacity
              className="ml-auto bg-red-50 p-2 rounded-lg"
              onPress={() => callNumber(contact.number)}
            >
              <Ionicons name="call" size={16} color="#f4511e" />
            </TouchableOpacity>
          </View>
        ))}

        {customContacts.length < 2 && (
          <View className="mt-4">
            <TextInput
              className="bg-white p-3 rounded-lg border border-gray-300 mb-3"
              placeholder="Contact Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="bg-white p-3 rounded-lg border border-gray-300 mb-3"
              placeholder="Contact Number"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              className="bg-red-500 p-3 rounded-lg"
              onPress={addContact}
            >
              <Text className="text-center text-white font-bold">Add Contact</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
