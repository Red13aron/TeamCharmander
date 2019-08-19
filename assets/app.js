/*

https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=c7c92f78a10b96b8086988432a4f4cf5&artist=cher&track=believe&format=json

*/

// Given input1(Start) input2(End) input 3(Track) input4(Artist)

// Given submit button(submitBtn)

// Take text from each input upon button click
// Store each in a variable


// If re-formatting of input is necessary to be concatenated--do it below
// toLowerCase()    ???

//Take variable value and concatenate into respective, provided queryURLs

const submitButton = document.getElementById("submit-btn");
const outputDisplayP = document.getElementById("output");
let trackTreckNum; //track lenght @ global scope for easy reference 

submitButton.addEventListener("click", function () {

    const startState = document.getElementById("starting-state").value;
    const startCity = document.getElementById("starting-city").value;
    const endState = document.getElementById("ending-state").value;
    const endCity = document.getElementById("ending-city").value;
    const trackName = document.getElementById("song-title").value;
    const artistName = document.getElementById("artist-name").value;

    function convertTrecktoTrack(distanceTime, trackTime) {
        const convertedDistanceTime = distanceTime;
        const convertedTrackTime = trackTime / 1000;
        trackTreckNum = Math.ceil(convertedDistanceTime / convertedTrackTime);
        console.log("This is the number of " + trackName + ": " + trackTreckNum);
        return trackTreckNum;
    }

    //sets up the function to get track length
    function getTrackLength(artist, track, distanceTime) {

        const apiKey = "c7c92f78a10b96b8086988432a4f4cf5"; // my api key for last.fm audioscrobbler

        const queryURL = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo" + "&api_key=" + apiKey + "&artist=" + artist + "&track=" + track + "&format=json"; // queryURL to be used in fetch 
        fetch(queryURL).then(function (response) {
            return response.json()
        }).then(function (responseJson) {
            if (responseJson.track.duration === "0") {
                console.log("Stop breaking our crap John.");
            }
            else {
                console.log(responseJson); // console log json to check integrity
                const songLength = responseJson.track.duration; //this returns the song length
                console.log("song length:", songLength);
                convertTrecktoTrack(distanceTime, songLength);
                document.getElementById("output").innerHTML = "You will listen to " + "'" + responseJson.track.name + "' " + trackTreckNum + " times!";
            }
        }).catch(function (error) {
            console.log(error);
        })
    }


    function getDirectionInfo(fromState, fromCity, toState, toCity) {
        const apiKey = "1ar8EgSpyQGUCgm8HV9dyZhG7AWbPq7a"
        const queryURL = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + fromCity + ", " + fromState + "&to=" + toCity + ", " + toState + "&unit=m";
        console.log(queryURL);
        fetch(queryURL).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            if (!responseJson.route.distance) {
                console.log("Stop breaking our crap John.");
            }
            else {
                console.log(responseJson);
                distanceInMiles = responseJson.route.distance;
                distanceInKm = distanceInMiles * 1.609344;
                driveTime = responseJson.route.time; //returns drive time in minutes
                console.log("drive time: ", driveTime);
                console.log("distance in miles: ", distanceInMiles);
                console.log("distance in km: ", distanceInKm);
                getTrackLength(artistName, trackName, driveTime); //runs the trackLength function
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
    getDirectionInfo(startState, startCity, endState, endCity); //runs the get direction info

})