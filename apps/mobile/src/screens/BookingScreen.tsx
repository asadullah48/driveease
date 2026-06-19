import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, Alert, ActivityIndicator,
} from "react-native";

export default function BookingScreen({ route, navigation }) {
  const { car, days = 3, total = 267 } = route?.params || {};
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("2026-07-01");
  const [returnDate, setReturnDate] = useState("2026-07-04");
  const [loading, setLoading] = useState(false);

  const carData = car || {
    id: 1, brand: "BMW", model: "3 Series", price_per_day: 89,
    image_url: "", location: "London, UK",
  };
  const totalDays = days || 3;
  const totalPrice = total || (carData.price_per_day * totalDays);

  const handleBook = async () => {
    if (!pickup || !dropoff) {
      Alert.alert("Missing Info", "Please fill pickup and dropoff locations.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Booking Confirmed! 🎉", `Your ${carData.brand} ${carData.model} is booked.\nTotal: €${totalPrice.toFixed(2)}`, [
        { text: "View My Bookings", onPress: () => navigation && navigation.navigate("MyBookings") },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vehicle</Text>
            <Text style={styles.summaryVal}>{carData.brand} {carData.model}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryVal}>{totalDays} days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rate</Text>
            <Text style={styles.summaryVal}>€{carData.price_per_day}/day</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>€{Number(totalPrice).toFixed(2)}</Text>
          </View>
        </View>

        {/* Dates */}
        <Text style={styles.sectionTitle}>Rental Dates</Text>
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>📅 Pickup Date</Text>
            <Text style={styles.dateVal}>{pickupDate}</Text>
          </View>
          <View style={styles.arrow}><Text style={styles.arrowText}>→</Text></View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>📅 Return Date</Text>
            <Text style={styles.dateVal}>{returnDate}</Text>
          </View>
        </View>

        {/* Locations */}
        <Text style={styles.sectionTitle}>Pickup Location</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>📍</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pickup address..."
            value={pickup}
            onChangeText={setPickup}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.sectionTitle}>Dropoff Location</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🏁</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dropoff address..."
            value={dropoff}
            onChangeText={setDropoff}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Driver Info */}
        <Text style={styles.sectionTitle}>Driver Details</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoRow}>👤  John Doe</Text>
          <Text style={styles.infoRow}>📧  john@example.com</Text>
          <Text style={styles.infoRow}>🪪   DL-UK-2019-AB1234</Text>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.paymentBox}>
          <Text style={styles.paymentText}>💳  Visa ending in 4242</Text>
          <Text style={styles.paymentSub}>Powered by Stripe · EUR</Text>
        </View>

        {/* Policy */}
        <View style={styles.policy}>
          <Text style={styles.policyText}>✅ Free cancellation up to 24 hours before pickup</Text>
          <Text style={styles.policyText}>✅ Comprehensive insurance included</Text>
          <Text style={styles.policyText}>✅ Unlimited mileage</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total charge</Text>
          <Text style={styles.footerTotal}>€{Number(totalPrice).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleBook} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.confirmText}>Confirm Booking</Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: "#F8FAFC" },
  summaryCard:    { margin: 20, backgroundColor: "#fff", borderRadius: 16, padding: 20, elevation: 3 },
  summaryTitle:   { fontSize: 16, fontWeight: "700", color: "#0F172A", marginBottom: 14 },
  summaryRow:     { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel:   { fontSize: 14, color: "#64748B" },
  summaryVal:     { fontSize: 14, fontWeight: "600", color: "#0F172A" },
  totalRow:       { borderTopWidth: 1, borderTopColor: "#E2E8F0", paddingTop: 12, marginTop: 4 },
  totalLabel:     { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  totalVal:       { fontSize: 20, fontWeight: "800", color: "#2563EB" },
  sectionTitle:   { fontSize: 15, fontWeight: "700", color: "#0F172A", marginHorizontal: 20, marginBottom: 10, marginTop: 4 },
  dateRow:        { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 16 },
  dateBox:        { flex: 1, backgroundColor: "#fff", borderRadius: 12, padding: 14, elevation: 2 },
  dateLabel:      { fontSize: 11, color: "#94A3B8", marginBottom: 4 },
  dateVal:        { fontSize: 14, fontWeight: "600", color: "#0F172A" },
  arrow:          { paddingHorizontal: 10 },
  arrowText:      { fontSize: 20, color: "#2563EB" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, elevation: 2, marginBottom: 14 },
  inputIcon:      { fontSize: 16, marginRight: 10 },
  input:          { flex: 1, fontSize: 14, color: "#1E293B" },
  infoBox:        { backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 12, padding: 16, elevation: 2, marginBottom: 14, gap: 8 },
  infoRow:        { fontSize: 14, color: "#334155" },
  paymentBox:     { backgroundColor: "#EFF6FF", marginHorizontal: 20, borderRadius: 12, padding: 16, marginBottom: 14 },
  paymentText:    { fontSize: 15, fontWeight: "600", color: "#1E40AF" },
  paymentSub:     { fontSize: 12, color: "#3B82F6", marginTop: 4 },
  policy:         { marginHorizontal: 20, gap: 8, marginBottom: 10 },
  policyText:     { fontSize: 13, color: "#475569" },
  footer:         { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 12 },
  footerLabel:    { fontSize: 13, color: "#64748B" },
  footerTotal:    { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  confirmBtn:     { backgroundColor: "#2563EB", borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, minWidth: 160, alignItems: "center" },
  confirmText:    { color: "#fff", fontSize: 16, fontWeight: "700" },
});
