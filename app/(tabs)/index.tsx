import { Image, StyleSheet, ScrollView, Pressable, View } from "react-native";

import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function HomeScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const checkImageGalleryPermission = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Media access is needed to select images to convert");
    }
  };

  const checkCameraRollPermission = async () => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, camera permissions is needed to save photos to device!");
    }
  };

  const pickImages = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 1,
      });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const saveImage = async (uri: string) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertImagesToJPEG = async () => {
    setIsConverting(true);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      await saveImage(image);
    }
    setIsConverting(false);
    alert("Images saved to device!");
  };

  useEffect(() => {
    checkImageGalleryPermission();
    checkCameraRollPermission();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">JPEG Converter</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Select Images</ThemedText>
        <Pressable onPress={pickImages}>
          <ThemedText style={styles.openGalleryButton}>Open Gallery</ThemedText>
        </Pressable>
        {/* For all selected images, show a horizonally scrolling window with each image's preview */}
        <ThemedView style={styles.galleryWrapper}>
          <ScrollView horizontal>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </ThemedView>
        <ThemedText>All images are converted to JPEG.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Convert!</ThemedText>
        <Pressable onPress={convertImagesToJPEG}>
          {isConverting ? (
            <ThemedText>Converting...</ThemedText>
          ) : (
            <ThemedText style={styles.convertButton}>Convert</ThemedText>
          )}
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logoWrapper: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 300,
  },
  galleryWrapper: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  galleryImage: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  openGalleryButton: {
    backgroundColor: "white",
    color: "black",
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  convertButton: {
    backgroundColor: "#333344",
    color: "white",
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
  },
});
