import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { User, Album } from '../types/data.tsx'

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                if (response.data.length > 0) {
                    const albumUsers = response.data;
                    const resultado = await Promise.all(albumUsers.map(async (user: User, index: number) => {
                        try {
                            const responseAlbum = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
                            const albumsData: any[] = responseAlbum.data; // Aquí asumimos que response.data es una matriz de objetos
                            const albums: Album[] = albumsData.map((album: any) => ({
                                id: album.id,
                                title: album.title,
                                userId: album.userId
                            }));
                            const finalUser: User = {
                                id: user.id,
                                name: user.name,
                                albums: albums
                            };
                            return finalUser;
                        } catch (error) {
                            console.error('Error fetching albums:', error);
                            return null;
                        }
                    }));
                    setUsers(resultado);
                }

            } catch (error) {
                setUsers([])

                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const toggleUserExpansion = (userId: number) => {
        setExpandedUserId(prevId => (prevId === userId ? null : userId));
    };

    const onAlbumSelected = (album: Album) => {
        navigation.navigate('AlbumImages', { data: album })
    }

    const click2 = () => {
        console.log("Hi2")
    }

    const renderUser = ({ item }: { item: User }) => (
        <View style={styles.userContainer}>
            <TouchableOpacity onPress={() => toggleUserExpansion(item.id)}>
                <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>

            {expandedUserId === item.id && item.albums && (
                <View style={styles.albumContainer}>
                    <FlatList
                        data={item.albums}
                        keyExtractor={album => album.id.toString()}
                        renderItem={({ item: album }) => (
                            <TouchableOpacity onPress={()=> onAlbumSelected(album)} style={styles.itemContainer}>
                                <Text style={styles.nameText}>{album.title}</Text>
                                <TouchableOpacity onPress={()=> click2()} style={styles.btnDelete}>
                                    <Text style={styles.txtBtnDelete}>Delete</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView>
            <Header title='Users' noBack={true} noAlbum={true}/>
            {users.length > 0 ?
                <FlatList
                    data={users}
                    keyExtractor={user => user.id.toString()}
                    renderItem={renderUser}
                    contentContainerStyle={styles.container}
                    style={{marginBottom: 20}}
                />
                : <Text>No hay usuarios disponibles</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
    },
    userContainer: {
        marginBottom: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    albumContainer: {
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 5,
    },
    albumItem: {
        paddingVertical: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      nameText: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 0.8,
      },
      btnDelete: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        flex: 0.2,
      },
      txtBtnDelete: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
      },
});

export default Home;
