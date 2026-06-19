import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, Image, ActivityIndicator, SafeAreaView,
} from "react-native";

const CATEGORIES = [
  { id: "all", label: "All", icon: "🚗" },
  { id: "economy", label: "Economy", icon: "💰" },
  { id: "suv", label: "SUV", icon: "🏔️" },
  { id: "luxury", label: "Luxury", icon: "💎" },
  { id: "electric", label: "Electric", icon: "⚡" },
  { id: "van", label: "Van", icon: "🚐" },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockCars = [
    { id: 1, brand: "BMW", model: "3 Series", year: 2023, category: "luxury", transmission: "automatic", seats: 5, price_per_day: 89, location: "London, UK", rating: 4.8, fuel_type: "petrol", image_url: "https://via.placeholder.com/400x200/1a1a2e/ffffff?text=BMW+3+Series" },
    { id: 2, brand: "Volkswagen", model: "Golf", year: 2022, category: "economy", transmission: "manual", seats: 5, price_per_day: 45, location: "Berlin, Germany", rating: 4.5, fuel_type: "diesel", image_url: "https://via.placeholder.com/400x200/16213e/ffffff?text=VW+Golf" },
    { id: 3, brand: "Tesla", model: "Model 3", year: 2023, category: "electric", transmission: "automatic", seats: 5, price_per_day: 120, location: "Amsterdam, NL", rating: 4.9, fuel_type: "electric", image_url: "https://via.placeholder.com/400x200/0f3460/ffffff?text=Tesla+Model+3" },
    { id: 4, brand: "Ford", model: "Explorer", year: 2022, category: "suv", transmission: "automatic", seats: 7, price_per_day: 95, location: "Paris, France", rating: 4.6, fuel_type: "petrol", image_url: "https://via.placeholder.com/400x200/533483/ffffff?text=Ford+Explorer" },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = category === "all" ? mockCars : mockCars.filter(c => c.category === category);
      setCars(filtered);
      setLoading(false);
    }, 500);
  }, [category]);

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}
      onPress={() => navigation && navigation.navigate("CarDetail", { car: item })}>
      <Image source={{ uri: item.image_url }} style={styles.carImage} />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.carName}>{item.brand} {item.model}</Text>
          <Text style={styles.carPrice}>€{item.price_per_day}<Text style={styles.perDay}>/day</Text></Text>
        </View>
        <Text style={styles.carLocation}>📍 {item.location}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.badge}>{item.transmission}</Text>
          <Text style={styles.badge}>{item.seats} seats</Text>
          <Text style={styles.badge}>{item.fuel_type}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Find your ride 🚗</Text>
          <Text style={styles.subtitle}>Explore cars across Europe</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>AS</Text></View>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput style={styles.searchInput} placeholder="Search by city or country..."
          value={search} onChangeText={setSearch} placeholderTextColor="#9CA3AF" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat.id}
            style={[styles.catChip, category === cat.id && styles.catChipActive]}
            onPress={() => setCategory(cat.id)}>
            <Text style={styles.catIcon}>{cat.icon}</Text>
            <Text style={[styles.catLabel, category === cat.id && styles.catLabelActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading
        ? <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
        : <FlatList data={cars} keyExtractor={i => i.id.toString()} renderItem={renderCard}
            contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.empty}>No cars found.</Text>} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: "#F8FAFC" },
  header:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  greeting:        { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle:        { fontSize: 13, color: "#64748B", marginTop: 2 },
  avatar:          { width: 40, height: 40, borderRadius: 20, backgroundColor: "#2563EB", justifyContent: "center", alignItems: "center" },
  avatarText:      { color: "#fff", fontWeight: "700", fontSize: 14 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, elevation: 2, marginBottom: 12 },
  searchIcon:      { fontSize: 16, marginRight: 8 },
  searchInput:     { flex: 1, fontSize: 14, color: "#1E293B" },
  categories:      { paddingLeft: 20, marginBottom: 16, flexGrow: 0 },
  catChip:         { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  catChipActive:   { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  catIcon:         { fontSize: 14, marginRight: 4 },
  catLabel:        { fontSize: 13, color: "#475569", fontWeight: "500" },
  catLabelActive:  { color: "#fff" },
  list:            { paddingHorizontal: 20, paddingBottom: 100 },
  card:            { backgroundColor: "#fff", borderRadius: 16, marginBottom: 16, elevation: 3, overflow: "hidden" },
  carImage:        { width: "100%", height: 180, backgroundColor: "#E2E8F0" },
  cardBody:        { padding: 14 },
  cardHeader:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  carName:         { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  carPrice:        { fontSize: 18, fontWeight: "800", color: "#2563EB" },
  perDay:          { fontSize: 12, fontWeight: "400", color: "#64748B" },
  carLocation:     { fontSize: 13, color: "#64748B", marginBottom: 10 },
  cardFooter:      { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" },
  badge:           { backgroundColor: "#F1F5F9", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, fontSize: 11, color: "#475569" },
  rating:          { marginLeft: "auto", fontSize: 13, fontWeight: "600", color: "#0F172A" },
  empty:           { textAlign: "center", color: "#94A3B8", marginTop: 60, fontSize: 15 },
});
