import { StyleSheet, Image, View } from "react-native";

import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
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
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>
        This app is a simple image converter. It allows you to select images
        from your gallery and convert them to JPEG format.
      </ThemedText>
      <ThemedText>
        {/* The app is free and open source. */}
        The app is free and open source. You can find the source code
        <ExternalLink href="https://github.com/ybhaw?tab=repositories">
          {" "}
          here
        </ExternalLink>
        .
      </ThemedText>

      <ThemedView style={[styles.titleContainer, styles.mt1]}>
        <ThemedText type="title">Why make this?</ThemedText>
      </ThemedView>
      <ThemedText>
        This year (2025), my new year goal was to do some travel journaling. I
        had taken a lot of pictures with my phone, which are stored as HEIC
        format.
      </ThemedText>
      <ThemedText>
        When I went to my local print shop, they told me they couldn't print in
        this format. So, I had to convert them to JPEG. This was an endeavor.
        Websites with limits, apps with ads and limits, watermarks... Image
        conversion is a simple task, it should not be a headache
        <ThemedText type="title">.</ThemedText>
      </ThemedText>
      <ThemedText>
        I already had a dev account for a different project that I am working
        on, so decided to release this app for free. I hope it helps at least
        one more person.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
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
  mt1: {
    marginTop: 16,
  },
});
