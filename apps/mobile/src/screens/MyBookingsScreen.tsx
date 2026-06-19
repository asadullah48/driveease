import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";

const MOCK_BOOKINGS = [
  { id: 1, car: "BMW 3 Series", pickup: "London, UK", dropoff: "Manchester, UK", pickupDate: "2026-07-01", returnDate: "2026-07-04", total: 267, status: "confirmed" },
  { id: 2, car: "Tesla Model 3", pickup: "Amsterdam, NL", dropoff: "Rotterdam, NL", pickupDate: "2026-06-15", returnDate: "2026-06-17", total: 240, status: "completed" },
  { id: 3, car: "Volkswagen Golf", pickup: "Berlin, DE", dropoff: "Berlin, DE", pickupDate: "2026-05-20", returnDate: "2026-05-22", total: 90, status: "completed" },
];

const STATUS_COLORS = {
  confirmed:  { bg: "#DBEAFE", text: "#1D4ED8" },
  active:     { bg: "#DCFCE7", text: "#15803D" },
  completed:  { bg: "#F1F5F9", text: "#475569" },
  cancelled:  { bg: "#FEE2E2", text: "#DC2626" },
  pending:    { bg: "#FEF9C3", text: "#CA8A04" },
};

export default function MyBookingsScreen({ navigation }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "confirmed", "active", "completed", "cancelled"];
  const filtered = filter === "all" ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => b.status === filter);

  const renderBooking = ({ item }) => {
    const sc = STATUS_COLORS[item.status] || STATUS_COLORS.pending;
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.carName}>{item.car}</Text>
          <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
            <Text style={[styles.statusText, { color: sc.text }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.routeRow}>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>🟢</Text>
            <Text style={styles.routeText}>{item.pickup}</Text>
          </View>
          <Text style={styles.routeArrow}>→</Text>
          <View style={styles.routePoint}>
            <Text style={styles.routeIcon}>🔴</Text>
            <Text style={styles.routeText}>{item.dropoff}</Text>
          </View>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>📅 {item.pickupDate}  →  {item.returnDate}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.totalText}>€{item.total.toFixed(2)}</Text>
          {item.status === "confirmed" && (
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {item.status === "completed" && (
            <TouchableOpacity style={styles.reviewBtn}>
              <Text style={styles.reviewText}>Leave Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <View style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id.toString()}
        renderItem={renderBooking}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No bookings found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: "#F8FAFC" },
  header:          { fontSize: 24, fontWeight: "700", color: "#0F172A", padding: 20, paddingBottom: 12 },
  filters:         { flexDirection: "row", paddingHorizontal: 20, gap: 8, marginBottom: 12, flexWrap: "wrap" },
  filterChip:      { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E2E8F0" },
  filterChipActive:{ backgroundColor: "#2563EB", borderColor: "#2563EB" },
  filterText:      { fontSize: 13, color: "#64748B", fontWeight: "500" },
  filterTextActive:{ color: "#fff" },
  list:            { paddingHorizontal: 20, paddingBottom: 40 },
  card:            { backgroundColor: "#fff", borderRadius: 16, marginBottom: 14, padding: 16, elevation: 3 },
  cardTop:         { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  carName:         { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  statusBadge:     { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText:      { fontSize: 11, fontWeight: "700" },
  routeRow:        { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 },
  routePoint:      { flexDirection: "row", alignItems: "center", flex: 1, gap: 6 },
  routeIcon:       { fontSize: 10 },
  routeText:       { fontSize: 13, color: "#334155", flex: 1 },
  routeArrow:      { fontSize: 16, color: "#94A3B8" },
  dateRow:         { marginBottom: 12 },
  dateText:        { fontSize: 13, color: "#64748B" },
  cardFooter:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 12 },
  totalText:       { fontSize: 18, fontWeight: "800", color: "#0F172A" },
  cancelBtn:       { borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: "#EF4444" },
  cancelText:      { color: "#EF4444", fontSize: 13, fontWeight: "600" },
  reviewBtn:       { borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#2563EB" },
  reviewText:      { color: "#fff", fontSize: 13, fontWeight: "600" },
  empty:           { textAlign: "center", color: "#94A3B8", marginTop: 60, fontSize: 15 },
});
