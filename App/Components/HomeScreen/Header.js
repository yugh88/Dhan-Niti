import React from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { useUser } from '@clerk/clerk-react';
import Women from './../../../assets/images/Women.png';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Header() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                {user?.imageUrl && (
                    <Image
                        source={{ uri: user.imageUrl }}
                        style={styles.userImage}
                    />
                )}
                <View>
                    <Text style={styles.greetingText}>Welcome,</Text>
                    <Text style={styles.mainText}>{user?.fullName}</Text>
                </View>
                <Image source={Women} style={styles.womenImage} />
            </View>
            
            {/* Search Bar Section */}
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder='Search Courses' 
                    placeholderTextColor="#aaa"
                />
                <FontAwesome5 name="search" size={20} color="black" style={styles.searchIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '6857E8', 
    },
    topSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, 
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    greetingText: {
        color: '#fff',
        fontFamily: 'Delius', 
        fontSize: 20,
    },
    mainText: {
        color: '#fff',
        fontFamily: 'Delius', 
        fontSize: 25,
    },
    womenImage: {
        width: 105,
        height: 115,
        borderRadius: 29,
        marginLeft:10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 6,
        elevation: 3, 
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'outfit',
        color: '#000',
    },
    searchIcon: {
        marginLeft: 10,
    },
});