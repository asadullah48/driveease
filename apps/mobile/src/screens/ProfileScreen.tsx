import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from "react-native";

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const menuItems = [
    { icon: "📋", label: "My Bookings",       action: () => navigation && navigation.navigate("MyBookings") },
    { icon: "🪪",  label: "Driving License",   action: () => {} },
    { icon: "💳",  label: "Payment Methods",   action: () => {} },
    { icon: "📍",  label: "Saved Locations",   action: () => {} },
    { icon: "⭐",  label: "My Reviews",        action: () => {} },
    { icon: "🎁",  label: "Referral Program",  action: () => {} },
    { icon: "❓",  label: "Help & Support",    action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={styles.avatarText}>AS</Text></View>
          <Text style={styles.name}>Asadullah Shafique</Text>
          <Text style={styles.email}>asadullah@email.com</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>🇬🇧 🇩🇪 🇫🇷</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={item.action} activeOpacity={0.7}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>🔔 Push Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications}
              trackColor={{ true: "#2563EB" }} thumbColor="#fff" />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>📧 Email Updates</Text>
            <Switch value={emailUpdates} onValueChange={setEmailUpdates}
              trackColor={{ true: "#2563EB" }} thumbColor="#fff" />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪 Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>DriveEase v1.0.0 · Built with ❤️</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: "#F8FAFC" },
  avatarSection: { alignItems: "center", paddingVertical: 28, backgroundColor: "#fff", marginBottom: 12 },
  avatar:        { width: 80, height: 80, borderRadius: 40, backgroundColor: "#2563EB", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText:    { color: "#fff", fontSize: 28, fontWeight: "700" },
  name:          { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  email:         { fontSize: 13, color: "#64748B", marginTop: 4, marginBottom: 20 },
  statsRow:      { flexDirection: "row", alignItems: "center", gap: 24 },
  stat:          { alignItems: "center" },
  statNum:       { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  statLabel:     { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  divider:       { width: 1, height: 32, backgroundColor: "#E2E8F0" },
  section:       { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, marginBottom: 12, overflow: "hidden" },
  sectionTitle:  { fontSize: 13, fontWeight: "600", color: "#94A3B8", padding: 16, paddingBottom: 8 },
  menuItem:      { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  menuIcon:      { fontSize: 18, marginRight: 14, width: 24 },
  menuLabel:     { flex: 1, fontSize: 15, color: "#334155" },
  menuArrow:     { fontSize: 20, color: "#CBD5E1" },
  toggleRow:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  toggleLabel:   { fontSize: 15, color: "#334155" },
  logoutBtn:     { marginHorizontal: 16, marginBottom: 12, backgroundColor: "#FEF2F2", borderRadius: 16, padding: 16, alignItems: "center" },
  logoutText:    { fontSize: 15, color: "#EF4444", fontWeight: "600" },
  version:       { textAlign: "center", color: "#CBD5E1", fontSize: 12, marginBottom: 30 },
});
