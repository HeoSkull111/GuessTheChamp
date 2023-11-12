import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

import { listChampions } from "../../services/champions.js";
import { getRandomSplashArt } from "../../services/splash_art.js";

import InputChampion from "../../shared/InputChampion.js";

export default function Slash(props) {
  const [slashart, setSlashArt] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [championSelected, setChampionSelected] = React.useState([]);

  const onSubmit = (champion) => {
    setChampionSelected([champion, ...championSelected]);
    setCount(count + 1);
  };

  useEffect(() => {
    getRandomSplashArt().then((slashart) => {
      setSlashArt(slashart);
    });
  }, [listChampions]);

  return (
    <View>
      <View style={styles.questionContainer}>
        <View style={styles.questionWrapper}>
          <Text style={styles.text}>Which Champion's Art</Text>
          <Image
            style={{ width: 250, height: 250 }}
            source={{ uri: slashart.image }}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <InputChampion
          championSelected={championSelected}
          onSubmit={onSubmit}
        />
      </View>

      <View>
        {championSelected.map((champion) => {
          return (
            <View
              style={styles.guessChampionCardContainer}
              key={champion.name}
            >
              <View
                style={[
                  styles.guessChampionCardWrapper,
                  {
                    backgroundColor:
                      champion.name === slashart.champion
                        ? "green"
                        : "red",
                  },
                ]}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: champion.avatar }}
                />
                <Text style={styles.text}>{champion.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const BackgroundColor = "#1E2328";
const BorderInputColor = "#06B5B3";
const BorderWidth = 2;

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  questionWrapper: {
    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,
    borderColor: BorderInputColor,
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontSize: 20,
  },

  quote: {
    color: "white",
    fontSize: 20,
    flexWrap: "wrap",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  guessChampionCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  guessChampionCardWrapper: {
    width: 250,

    backgroundColor: BackgroundColor,
    borderWidth: BorderWidth,
    borderColor: BorderInputColor,

    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
