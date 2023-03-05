// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css"
import * as React from "react"
// import { useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchData, sendAttempts } from "../store/globalSlice";
// import * as Speech from "expo-speech";
import {
 
  Image,
  TouchableOpacity,
 
} from "react";
import styles from "./styles"; 
// import { Audio } from "expo-av";
// import tw from "tailwind-react-native-classnames";
const word_Pic = [{
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png",
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image: "image.png",
  
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png",
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png",
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png",
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png",
  DefintioninAc: "قطه",
  DefintioninEn: "cat",
  image:"image.png"
}]

const Connect = ({ navigation }) => {
  // let route = useRoutes();
  // const dispatch = useDispatch();
  // const { playerName } = useSelector((state) => state.auth);
  // const old_word_Pic = route.params.word_Pic;
  // const { word_Pic, url } = useSelector((state) => state.global);
  //to set how many correct answers
  const [done, setDone] = useState(0);
  //to set how many wrong answers
  const [wrong, setWrong] = useState(0);
  //if right match, will be true
  const [correct0, setCorrect0] = useState(false);
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [correct3, setCorrect3] = useState(false);
  const [correct4, setCorrect4] = useState(false);
  const [correct5, setCorrect5] = useState(false);

  ///to store wrong count for each word
  const [wrong0, setWrong0] = useState(0);
  const [wrong1, setWrong1] = useState(0);
  const [wrong2, setWrong2] = useState(0);
  const [wrong3, setWrong3] = useState(0);
  const [wrong4, setWrong4] = useState(0);
  const [wrong5, setWrong5] = useState(0);

  //////////////////create sounds array//////////////
  const sounds = [
    require("./assets/sound/gameBased-learn_assets_sounds_correct.mp3"),
    require("./assets/sound/gameBased-learn_assets_sounds_done.mp3"),
    require("./assets/sound/gameBased-learn_assets_sounds_touch.mp3"),
    require("./assets/sound/gameBased-learn_assets_sounds_wrong.mp3"),
  ];
  /////////////////////////////////////////////////
  /////////////////function to play sound\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const playSound = async (i) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(sounds[i]);
      await sound
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            sound.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////

  ///////////////refresh on navigating back from Score screen///////////////
  useEffect( () =>
  {
    const unsubscribe = navigation.addListener( "focus", () =>
    {
      // dispatch(fetchData());
      setRandWord( random() );
      setRandPic( random() );
      setDone( 0 );
      setWrong( 0 );
      setCorrect0( false );
      setCorrect1( false );
      setCorrect2( false );
      setCorrect3( false );
      setCorrect4( false );
      setCorrect5( false );
      setWrong0( 0 );
      setWrong1( 0 );
      setWrong2( 0 );
      setWrong3( 0 );
      setWrong4( 0 );
      setWrong5( 0 );
      setNoRepeat( [] );
    } );
    return unsubscribe;
  } );
  // }, [navigation, dispatch]);

  //////////////////////////////////////////////

  ///creating a random array of numbers from 0 to 5 \\\\\\\\\\\\\\\\\\\\\\\\\\
  const length = word_Pic.length;
  const random = () => {
    var i = 0;
    var firstNum = 7;
    while (firstNum >= 6) {
      firstNum = Math.floor(Math.random() * word_Pic.length);
    }
    var randoms = [firstNum];
    while (i < length - 2) {
      var num = Math.floor(Math.random() * word_Pic.length);
      var count = 0;
      if (num < 6) {
        for (let r = 0; r < randoms.length; r++) {
          if (num === randoms[r]) {
            count += 1;
          }
        }
        if (count === 0) {
          randoms.push(num);
          i++;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }
    return randoms;
  };

  ///////////////////////////////////////////////////////////////////

  ////////////////////creating words cards\\\\\\\\\\\\\\\\\\\\\\\\\\\
  var wordCards = [];
  var wordID = -1;
  var wordIndex = -1;
  const [randomWords, setRandWord] = useState(random());
  const setWordView = (correct) => {
    word_Pic?.forEach((word, i) => {
      wordCards.push(
        <TouchableOpacity
          className =" mt-10"
          style={[styles.card, i > 5 ]}
          onPress={() => {
            // playSound(3);
            wordIndex = word_Pic.indexOf(word_Pic[randomWords[i]]);
            wordID = word_Pic[randomWords[i]]?._id;
            counter++;
            check().then((data) => {
              setWordView(data);
            });
          }}
          key={word_Pic[randomWords[i]]?._id}
        >
          {word_Pic.indexOf(word_Pic[randomWords[i]]) === 0 && correct0 ? (
            <h1
            className ="rounded-3xl"
              style={[
                styles.cardText,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) === 1 && correct1 ? (
              <h1
                className="rounded-3xl"
              style={[
                styles.cardText,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) === 2 && correct2 ? (
                <h1
                className="rounded-3xl"
              style={[
                styles.cardText,
                { backgroundColor: "#50D97F" },
              
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) === 3 && correct3 ? (
            <h1
                    style={[
                      styles.cardText,
                      { backgroundColor: "#50D97F" },
                    ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) === 4 && correct4 ? (
                    <h1
                    className="rounded-3xl"
              style={[
                styles.cardText,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : word_Pic.indexOf(word_Pic[randomWords[i]]) === 5 && correct5 ? (
                      <h1
                      className="rounded-3xl"
              style={[
                styles.cardText,
                { backgroundColor: "#50D97F" },
                
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          ) : (
                        <h1
                        className="rounded-3xl text-white"   
              style={[
                styles.cardText,
                
                { backgroundColor: "#1D3Eff" },
            
              ]}
            >
              {word_Pic[randomWords[i]]?.DefintioninEn}
            </h1>
          )}
        </TouchableOpacity>
      );
    });

    return wordCards;
  };
  //////////////////////////////////////////////////////////////////
  /////////////////////creating pics cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  var picCards = [];
  var picID = -2;
  const [randomPics, setRandPic] = useState(random());
  const setPicView = () => {
    var pic = -2;
    word_Pic?.forEach((word, i) => {
      const imgPath = word_Pic[randomPics[i]]?.Image;
      picCards.push(
        <TouchableOpacity
        className="mt-10"
          style={[styles.card, i > 5 ]}
          onPress={() => {
            // playSound(3);
            pic = word_Pic[randomPics[i]];
            picID = word_Pic[randomPics[i]]?._id;

            counter++;
            check();
          }}
          key={word_Pic[randomPics[i]]?._id}
        >
          {word_Pic.indexOf(word_Pic[randomPics[i]]) === 0 && correct0 ? (
            <div
            className="rounded-3xl"
           
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {/* <Image source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) === 1 && correct1 ? (
              <div
              className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
             
              ]}
            >
              {/* <Image source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) === 2 && correct2 ? (
                <div
                className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
              
              ]}
            >
              {/* <Image  source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) === 3 && correct3 ? (
                  <div
                  className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {/* <Image  source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) === 4 && correct4 ? (
                    <div
                    className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
               
              ]}
            >
              {/* <image source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : word_Pic.indexOf(word_Pic[randomPics[i]]) === 5 && correct5 ? (
                      <div
                      className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#50D97F" },
                
              ]}
            >
              {/* <image source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          ) : (
                        <div
                        className="rounded-3xl"
              style={[
                styles.cardImg,
                { backgroundColor: "#1D3Eff" },
               
              ]}
            >
              {/* <Image source={{ uri: url + imgPath }} style={styles.img} /> */}
            </div>
          )}
        </TouchableOpacity>
      );
    });

    return picCards;
  };
  /////////////////////////////////////////////////////////////////////////////

  ///////////////////handling Card press\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //counter will be increased by 1 every click on card
  var counter = 0;
  // array to store the done wordID to not be repeated
  const [noRepeat, setNoRepeat] = useState([]);

  //to store if the word is new or already done
  var status = "";

  const check = async () => {
    //if correct
    if (counter % 2 === 0 && wordID === picID) {
      //check if the wordID is already done
      status = "new";
      if (noRepeat.length !== 0) {
        noRepeat.forEach((el) => {
          if (el === wordID) {
            status = "found";
          }
        });
      }

      //if wordID was not found (new) in the noRepeat array
      if (status === "new") {
        setNoRepeat([...noRepeat, wordID]);
        setDone(done + 1);
        // //to speak the word
        // await Speech.speak(`"${word_Pic[wordIndex]?.DefintioninEn}"`, {
        //   rate: 0.4,
        //   quality: "Enhanced",
        //   language: "en-US",
        // });

        //wait a while before continuing to speak the word completely
        setTimeout(() => {
          if (wordIndex === 0) {
            setCorrect0(true);
          } else if (wordIndex === 1) {
            setCorrect1(true);
          } else if (wordIndex === 2) {
            setCorrect2(true);
          } else if (wordIndex === 3) {
            setCorrect3(true);
          } else if (wordIndex === 4) {
            setCorrect4(true);
          } else if (wordIndex === 5) {
            setCorrect5(true);
          }

          if (done < 5) {
            //play sound
            playSound(0);
          } else if (done === 5) {
            //play sound
            playSound(2);
          }
        }, 500);
      }

      //if wrong
    } else if (counter % 2 === 0 && wordID !== picID) {
      //to edit wrong count
      if (wordIndex === 0) {
        setWrong0(wrong0 + 1);
      } else if (wordIndex === 1) {
        setWrong1(wrong1 + 1);
      } else if (wordIndex === 2) {
        setWrong2(wrong2 + 1);
      } else if (wordIndex === 3) {
        setWrong3(wrong3 + 1);
      } else if (wordIndex === 4) {
        setWrong4(wrong4 + 1);
      } else if (wordIndex === 5) {
        setWrong5(wrong5 + 1);
      }
      setWrong(wrong + 1);
      //play sound
      playSound(1);
    }
   
  };
  ///////////////////////////////////////////////////////////////////
  return (
    <>
      <div style={styles.topBar}>
        <div style={{ flexDirection: "row" }}>
          <h1
            style={{
              marginBottom: "10%",
              color: "#fff",
              width: "75%",
              height: "100%",
              textAlignVertical: "center",
              padding: 3,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {/* Welcome {`${playerName} `} */}
            <Image
              source={require("./assets/image/smile.png")}
              style={{ width: 33, height: 33, marginTop: "3%" }}
            />
          </h1>
          {done >= 6 ? (
            <h1
              style={{
                width: "25%",
                height: "60%",
                margin: "1%",
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E20476",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onclick={() => {
                  const sentData = [
                    { question_id: word_Pic[0]?._id, attempts: wrong0 },
                    { question_id: word_Pic[1]?._id, attempts: wrong1 },
                    { question_id: word_Pic[2]?._id, attempts: wrong2 },
                    { question_id: word_Pic[3]?._id, attempts: wrong3 },
                    { question_id: word_Pic[4]?._id, attempts: wrong4 },
                    { question_id: word_Pic[5]?._id, attempts: wrong5 },
                  ];
                  // dispatch(sendAttempts({ questions: sentData, gameID: "0" }));
                  navigation.navigate("Score", {
                    wrong,
                    word_Pic,
                    path: "Connect",
                  });
                }}
              >
                <div>
                  <Image
                    source={require("./assets/image/rArrow.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </div>
              </TouchableOpacity>
            </h1>
          ) : (
            <div
              style={{
                width: "25%",
                marginTop: "8.5%",
                alignItems: "center",
                margin: "1%",
              }}
            >
             
            </div>
          )}
        </div>
      </div>
      <div style={styles.body}>
        <div style={styles.leftView}>{setWordView()}</div>
        <div style={styles.rightView}>{setPicView()}</div>
      </div>
    </>
  );
};

export default Connect;