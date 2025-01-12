import { View, Text, Image } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Courseitem({ item }) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#FFFFFF", // White background
        marginRight: 15,
        borderRadius: 15,
      }}
    >
      <Image
        source={{
          uri: item.banner || "https://example.com/default-banner.jpg", // Ensure default URL is valid
        }}
        style={{ width: 210, height: 120, borderRadius: 15 }}
      />
      <View style={{ padding: 7 }}>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
          }}
        >
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Feather name="book-open" size={18} color="#000000" />
          <Text style={{ fontFamily: "outfit", marginLeft: 5 }}>
            {item.chapters?.length || 0} Chapters
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <AntDesign name="clockcircle" size={18} color="#000000" />
          <Text style={{ fontFamily: "outfit", marginLeft: 5 }}>
            {item?.time || "N/A"}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            marginTop: 5,
            color: "#007BFF", // Primary color (blue)
            fontFamily: "outfit",
          }}
        >
          {item.price === 0 ? "Free" : item.price}
        </Text>
      </View>
    </View>
  );
}