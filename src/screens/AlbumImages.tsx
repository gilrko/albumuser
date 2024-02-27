import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { Album, Img } from '../types/data';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

type RouteProp = {
    params: {
        data: Album
    },
};

const windowWidth = Dimensions.get('window').width;

const AlbumImages: React.FC = () => {
    const route = useRoute<RouteProp>();
    const { data } = route.params;
    const navigation = useNavigation();
    const [images, setImages] = useState<Img[]>([]);
    const [allPhotosSelected, setAllPhotosSelected] = useState<boolean>(false)

    const onGoBack = () => {
        navigation.goBack()
    }
    useEffect(() => {
        const fetchImagesAlbum = async () => {
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
                const allImages: Img[] = response.data;
                if (allPhotosSelected) {
                    setImages(allImages);
                } else {
                    setImages(allImages.filter(image => image.albumId === data.id));
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchImagesAlbum();
    }, [data.id, allPhotosSelected])
    const renderItem = ({item} : Img) => {
        return (
            <Image source={{ uri: item.url }} style={styles.image} />
        );
    };
    const onChangeImages = () => {
        setAllPhotosSelected(prevState => !prevState)
        if(!allPhotosSelected) {
            setImages(images)
        } else {
            setImages(images.filter(image => image.albumId === data.id));
        }
    }

    return (
        <SafeAreaView>
            <Header title={allPhotosSelected ? 'All Photos' :  data.title} noBack={false} noAlbum={false} onGoBack={onGoBack} onChangeImages={onChangeImages} onStarSelected={allPhotosSelected}/>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.container}
                style={{marginBottom: 70}}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 0
    },
    image: {
        width: (windowWidth - 20) / 3,
        height: (windowWidth - 20) / 3,
        margin: 3,
        resizeMode: 'cover',
    },
});

export default AlbumImages;