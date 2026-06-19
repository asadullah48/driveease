import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";

export default function CarDetailScreen({ route, navigation }) {
  const car = route?.params?.car || {
    id: 1, brand: "BMW", model: "3 Series", year: 2023,
    price_per_day: 89, location: "London, UK", rating: 4.8,
    seats: 5, transmission: "automatic", fuel_type: "petrol",
    description: "Experience the ultimate driving machine. The BMW 3 Series combines sporty performance with everyday practicality.",
    features: "Bluetooth,Navigation,Heated Seats,Parking Sensors,Cruise Control",
    image_url: "https://via.placeholder.com/800x400/1a1a2e/ffffff?text=BMW+3+Series",
  };

  const features = (car.features || "").split(",").filter(Boolean);
  const [selectedDays, setSelectedDays] = useState(3);
  const total = (car.price_per_day * selectedDays).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: car.image_url }} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.carName}>{car.brand} {car.model}</Text>
              <Text style={styles.year}>{car.year} · {car.location}</Text>
            </View>
            <View>
              <Text style={styles.price}>€{car.price_per_day}</Text>
              <Text style={styles.perDay}>per day</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statVal}>⭐ {car.rating}</Text><Text style={styles.statLabel}>Rating</Text></View>
            <View style={styles.stat}><Text style={styles.statVal}>👤 {car.seats}</Text><Text style={styles.statLabel}>Seats</Text></View>
            <View style={styles.stat}><Text style={styles.statVal}>⚙️ {car.transmission}</Text><Text style={styles.statLabel}>Trans.</Text></View>
            <View style={styles.stat}><Text style={styles.statVal}>⛽ {car.fuel_type}</Text><Text style={styles.statLabel}>Fuel</Text></View>
          </View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{car.description}</Text>
          {features.length > 0 && <>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.features}>
              {features.map((f, i) => <View key={i} style={styles.feature}><Text style={styles.featureText}>✓ {f.trim()}</Text></View>)}
            </View>
          </>}
          <Text style={styles.sectionTitle}>Select Duration</Text>
          <View style={styles.daysRow}>
            {[1, 2, 3, 5, 7, 14].map(d => (
              <TouchableOpacity key={d} style={[styles.dayChip, selectedDays === d && styles.dayChipActive]}
                onPress={() => setSelectedDays(d)}>
                <Text style={[styles.dayText, selectedDays === d && styles.dayTextActive]}>{d}d</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total ({selectedDays} days)</Text>
          <Text style={styles.totalPrice}>€{total}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}
          onPress={() => navigation && navigation.navigate("Booking", { car, days: selectedDays, total })}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#F8FAFC" },
  image:        { width: "100%", height: 240, backgroundColor: "#E2E8F0" },
  body:         { padding: 20 },
  titleRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  carName:      { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  year:         { fontSize: 13, color: "#64748B", marginTop: 4 },
  price:        { fontSize: 24, fontWeight: "800", color: "#2563EB", textAlign: "right" },
  perDay:       { fontSize: 12, color: "#64748B", textAlign: "right" },
  statsRow:     { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 20, elevation: 2 },
  stat:         { alignItems: "center" },
  statVal:      { fontSize: 13, fontWeight: "600", color: "#0F172A", marginBottom: 4 },
  statLabel:    { fontSize: 11, color: "#94A3B8" },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A", marginBottom: 10, marginTop: 4 },
  description:  { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 },
  features:     { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  feature:      { backgroundColor: "#EFF6FF", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  featureText:  { fontSize: 13, color: "#2563EB" },
  daysRow:      { flexDirection: "row", gap: 10, marginBottom: 100 },
  dayChip:      { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0", backgroundColor: "#fff" },
  dayChipActive:{ backgroundColor: "#2563EB", borderColor: "#2563EB" },
  dayText:      { fontSize: 14, color: "#475569", fontWeight: "600" },
  dayTextActive:{ color: "#fff" },
  footer:       { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 10 },
  totalLabel:   { fontSize: 13, color: "#64748B" },
  totalPrice:   { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  bookBtn:      { backgroundColor: "#2563EB", borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14 },
  bookBtnText:  { color: "#fff", fontSize: 16, fontWeight: "700" },
});
