import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '/Users/yughjuneja/Dhan-Niti/App/Components/TabBar.js';

const TabLayout = () => {
  return (
    <Tabs 
      tabBar={(props) => <TabBar {...props} />} // Passing props to TabBar without screenOptions here
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,  // Header options are set per screen here
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShown: false, // You can set the header visibility per screen here as well
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;