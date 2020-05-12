import React, { useState, useEffect, useRef, } from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import MapboxGL from "@react-native-mapbox-gl/maps";
import axios from 'axios'
import Geocoder from 'react-native-geocoding';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import DefaultContainer from '../../components/DefaultContainer';
import { ScrollView } from 'react-native-gesture-handler';
import LocationItem from '../../components/LocationItem';

// import Geocoder from "react-map-gl-geocoder";


// MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false)


const assestsPath = "../../../assets/afterSignUp/";

const PAGE_SETTINGS = {
    City:{
        viewOnMap:true,
        icon:"city.png"
        },
    Skytrain:{
        viewOnMap:true,
        icon:"skytrain.png"
        },
    "Add School": {
        viewOnMap:false,
        icon:"school.png"
        },
    "Add Work": {
        viewOnMap:true,
        icon:"work.png"
        }
};
export default Search = React.memo(function Search(props){

	const dispatch = useDispatch();

	const [selectedData, setSelectedData] = useState({});
	const [search, setSearch] = useState("");
	const [forwardGeocode, setForwardGeocode] = useState({});
	const [forwardGeocodeUrl, setForwardGeocodeUrl] = useState('')
	const [loading, setLoading] = useState(true)
	const [loadedData, setLoadedData] = useState({})

	const cameraRef = useRef()

	// const geocodeObject = {
	// 	method: 'GET',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// }

	const onSearch = (text) => {
		setSearch(text)
	}

	// const geocode = async (search) => {

	// 	Geocoder.from(search)
	// 	.then(json => {
	// 		var location = json.results[0].geometry.location;
	// 		console.log(location);
	// 	})
	// 	.catch(error => console.warn(error));

	// 	console.log('===========================>>>>>>'.data);
	// }

	// useEffect(() => {
	// 		geocode(search);
	// }, [search]);

    const handleSearchBarIcon = () =>{
        if(props.pageType === "City")
            return(<Image source={require(assestsPath+"city.png")} style={{position:"absolute", top: 7, left:10}}/>)
        if(props.pageType === "Skytrain")
            return(<Image source={require(assestsPath+"skytrain.png")} style={{position:"absolute", top: 7, left:10}}/>)
        if(props.pageType === "Add School")
            return(<Image source={require(assestsPath+"school.png")} style={{position:"absolute", top: 7, left:10}}/>)
        if(props.pageType === "Add Work")
            return(<Image source={require(assestsPath+"work.png")} style={{position:"absolute", top: 7, left:10}}/>)
    }

    const handleViewOnMap = () =>{
        if(PAGE_SETTINGS[props.pageType].viewOnMap)
            return (
            <TouchableOpacity onPress={() => alert("OK")}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:26,}}>
                    <Text style={{color:"#252533", fontWeight:"bold"}}>View on Map</Text>
                    <Image source={require(assestsPath+"arrowPointRight.png")}/>
                </View>
            </TouchableOpacity>
            );
        return null;
	}
	var loadData = []

    const searchBar = () =>{
        return (
            <View style={{...styles.searchBar, flex:1, marginTop:20}}>

				{/* <View style={{flex:1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}> */}
				<GoogleAutoComplete apiKey=" debounce={300} minLength={3} queryTypes={'geocode'}>

						{({handleTextChange, locationResults}) => (
							<React.Fragment>
								{console.log(locationResults)}
								<View>
									{handleSearchBarIcon()}
									<TextInput
										placeholder={"Search"}
										style={{...styles.searchBar2, paddingLeft:45}}
										// value={search}
										onChangeText={handleTextChange}
									/>
								</View>
								<View style={{...styles.searchMenu}}>
									{handleViewOnMap()}
									<ScrollView>
										{locationResults.map(elem => (
											// loadData.concat({"description": elem.description})
											<LocationItem
											{...elem}
											key={elem.id}
											/>
										))}
									</ScrollView>
								</View>
								{/* {searchMenu(locationResults)} */}

							</React.Fragment>


						)}

				</GoogleAutoComplete>
		{/* </View> */}
				</View>
        );
    }

    const searchMenu = (locationResult) =>{
        if(locationResult)
        {
            let matches = locationResult.map((data, key)=>{
				// console.log("==============================")
				// console.log(data.description)
				// console.log("==============================")
                       return searchMenuItem(data["description"])
			});

            return(
                <View style={{...styles.searchMenu}}>
                    {handleViewOnMap()}
                    <KeyboardAwareScrollView style={{height:"100%", overflow:"scroll"}}>
                        {matches}
                    </KeyboardAwareScrollView>

                </View>
            );
        }
        return null;
    }

    const searchMenuItem = (item="") =>{
        return(
			<TouchableOpacity onPress={()=>alert("OK: " + item)}>
            	<View style={{...styles.searchMenuItem}}>
                	<Image source={require(assestsPath+"searchMenuItem.png")} style={{marginRight:13}}/>
                	<Text style={{fontSize:16, color:"#252533",}}>{item}</Text>
				</View>
            </TouchableOpacity>
        );
    }

    return (
        <DefaultContainer
        setCurrentPage={()=>props.navigation.navigate("AfterSignUp")}
        NavBarMiddleCustomText={props.pageType}
        NavBarMiddleContent={"custom"}
		showSkip={false}
		// paddingLeft={0}
		// padding={0}
		// paddingLeft={0}
		>
        {console.log("===============props ==>", props.backgroundColor)}
        {searchBar()}
        {/* {searchMenu()} */}
		{/* <View style={styles.page}>
        <View style={styles.container}>
		<MapboxGL.MapView
			style={styles.map}
			rotateEnabled={false}
			logoEnabled={false}
			// onPress={e => {
			// setSelectedLocationId(null)
			// }}
			>
			<MapboxGL.Camera
			ref={cameraRef}
			followUserLocation
			followUserMode="normal"
			defaultSettings={{
				// Default region to greater vancouver
				centerCoordinate: [-122.899684, 49.249126],
				zoomLevel: 8,
			}}
			/>
		</MapboxGL.MapView>
        </View>
      </View> */}
		</DefaultContainer>
    );
});

Search.PropTypes = {
    pageType: PropTypes.string,
  };

Search.defaultProps = {
    pageType: "City"
  };

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
		width: "100%",
        height: "100%",
	  },
	  container: {
		height: "100%",
		width: "100%",
		backgroundColor: "tomato"
	  },
	  map: {
		flex: 1
	  },
    searchBar:{
		// flex: 1,
		// position: 'absolute',
        width: '100%',
        height:45,
        borderStyle:"solid",
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom:20,
	},
	searchBar2:{
		// flex: 1,
		// position: 'absolute',
        width: '100%',
        height:45,
        borderStyle:"solid",
        borderColor: '#d8d8d8',
        borderWidth: 1,
        marginBottom:20,
    },
    searchMenu:{
        width:"100%",

    },
    searchMenuItem:{
        width:"100%",
        height:30,
        flexDirection:"row",
        // alignContent:"center",
        alignItems:"center",
        marginBottom: 20
    }
});


const DUMMY_DATA = [
	{"City": "Montebello sul Sangro"},
	{"City": "Sankt Johann im Pongau"},
	{"City": "Lavacherie"},
	{"City": "Pak Pattan"},
	{"City": "Arica"},
	{"City": "Panquehue"},
	{"City": "Stuttgart"},
	{"City": "Burhanpur"},
	{"City": "Horsham"},
	{"City": "Harnoncourt"},
	{"City": "Masullas"},
    {"City": "Waasmunster"},
    {"City": "Burnaby"},
    {"City": "Vancouver"},
    {"City": "Surrey"},
    {"City": "Richmond"},
	{"City": "Bay Roberts"},
	{"City": "Lasbela"},
	{"City": "Lustin"},
	{"City": "Cabo de Hornos"},
	{"City": "Lebach"},
	{"City": "Merrickville-Wolford"},
	{"City": "Massarosa"},
	{"City": "Rycroft"},
	{"City": "New Orleans"},
	{"City": "Casacalenda"},
	{"City": "Grand Falls"},
	{"City": "Owensboro"},
	{"City": "Kotelniki"},
	{"City": "Perwez"},
	{"City": "Judenburg"},
	{"City": "Portobuffolè"},
	{"City": "Verdun"},
	{"City": "Ichalkaranji"},
	{"City": "Rosolini"},
	{"City": "College"},
	{"City": "Cantley"},
	{"City": "Waidhofen an der Ybbs"},
	{"City": "Sant'Angelo a Cupolo"},
	{"City": "Weesp"},
	{"City": "Port Harcourt"},
	{"City": "Dibrugarh"},
	{"City": "Owerri"},
	{"City": "Antibes"},
	{"City": "Motherwell"},
	{"City": "Bear"},
	{"City": "Neumünster"},
	{"City": "Yeongju"},
	{"City": "Beerst"},
	{"City": "Ashbourne"},
	{"City": "Melipilla"},
	{"City": "Lourdes"},
	{"City": "Garbsen"},
	{"City": "Payakumbuh"},
	{"City": "Püttlingen"},
	{"City": "Nanded"},
	{"City": "Liers"},
	{"City": "Raichur"},
	{"City": "Bally"},
	{"City": "Forfar"},
	{"City": "Freux"},
	{"City": "Lambayeque"},
	{"City": "Stonewall"},
	{"City": "Plato"},
	{"City": "Milford Haven"},
	{"City": "Evere"},
	{"City": "Mombaruzzo"},
	{"City": "Ransart"},
	{"City": "Vrasene"},
	{"City": "Todi"},
	{"City": "Bilaspur"},
	{"City": "Huntley"},
	{"City": "Leers-et-Fosteau"},
	{"City": "Bonnyville Municipal District"},
	{"City": "Nanton"},
	{"City": "Nampa"},
	{"City": "Innisfail"},
	{"City": "Pontarlier"},
	{"City": "Oban"},
	{"City": "Westlock"},
	{"City": "Nässjö"},
	{"City": "Iowa City"},
	{"City": "Godhra"},
	{"City": "Froidchapelle"},
	{"City": "Sacramento"},
	{"City": "Gujrat"},
	{"City": "Schwedt"},
	{"City": "Kopeysk"},
	{"City": "Manukau"},
	{"City": "Yakhroma"},
	{"City": "Feldkirchen in Kärnten"},
	{"City": "Recanati"},
	{"City": "Montebello"},
	{"City": "Gespeg"},
	{"City": "Leffinge"},
	{"City": "Spaniard's Bay"},
	{"City": "Kapfenberg"},
	{"City": "Istmina"},
	{"City": "Meeuwen"},
	{"City": "Rawalpindi"},
	{"City": "Coassolo Torinese"},
	{"City": "Sant'Omero"},
	{"City": "Pallavaram"},
    {"City": "Batu"},
    {"City": "Stafford"},
	{"City": "Gifhorn"},
	{"City": "Chancay"},
	{"City": "Negrete"},
	{"City": "Motueka"},
	{"City": "Chapecó"},
	{"City": "Thorold"},
	{"City": "Tlaquepaque"},
	{"City": "Saint-Georges"},
	{"City": "Freiburg"},
	{"City": "Itagüí"},
	{"City": "Forchies-la-Marche"},
	{"City": "Marystown"},
	{"City": "Wolfsberg"},
	{"City": "Stevenage"},
	{"City": "Orito"},
	{"City": "Devonport"},
	{"City": "Wayaux"},
	{"City": "Springfield"},
	{"City": "Wandsworth"},
	{"City": "Bozeman"},
	{"City": "Sedgewick"},
	{"City": "Raipur"},
	{"City": "Bijapur"},
	{"City": "Gorzów Wielkopolski"},
	{"City": "Luziânia"},
	{"City": "Barranca"},
	{"City": "Roermond"},
	{"City": "Olathe"},
	{"City": "Sevilla"},
	{"City": "Casnate con Bernate"},
	{"City": "Vichte"},
	{"City": "Kansas City"},
	{"City": "Arles"},
	{"City": "Yeotmal"},
	{"City": "Boninne"},
	{"City": "Sahagún"},
	{"City": "Stade"},
	{"City": "New Westminster"},
	{"City": "Bydgoszcz"},
	{"City": "Santa Cruz de Lorica"},
	{"City": "Tuscaloosa"},
	{"City": "Durg"},
	{"City": "Halle"},
	{"City": "Delhi"},
	{"City": "Meerut Cantonment"},
	{"City": "Gignod"},
	{"City": "Ambala"},
	{"City": "Van"},
	{"City": "New Haven"},
	{"City": "Nellore"},
	{"City": "Midlands"},
	{"City": "Bourges"},
	{"City": "Queanbeyan"},
	{"City": "Wardin"},
	{"City": "Stirling"},
	{"City": "Aschaffenburg"},
	{"City": "LaSalle"},
	{"City": "Louvain-la-Neuve"},
	{"City": "Ede"},
	{"City": "Saint-Georges"},
	{"City": "Clovenfords"},
	{"City": "Napier"},
	{"City": "Cairns"},
	{"City": "Sacramento"},
	{"City": "Price"},
	{"City": "Wals-Siezenheim"},
	{"City": "Tintigny"},
	{"City": "Solnechnogorsk"},
	{"City": "Ligosullo"},
	{"City": "Bergen"},
	{"City": "Delicias"},
	{"City": "Saint-Pierre"},
	{"City": "Auburn"},
	{"City": "Rutigliano"},
	{"City": "Reading"},
	{"City": "Ñiquén"},
	{"City": "Profondeville"},
	{"City": "New Quay"},
	{"City": "Warminster"},
	{"City": "Angoulême"},
	{"City": "Tauranga"},
	{"City": "Vezin"},
	{"City": "Gumi"},
	{"City": "Bihain"},
	{"City": "Fredericton"},
	{"City": "Levallois-Perret"},
	{"City": "Eastbourne"},
	{"City": "Pont-Saint-Martin"},
	{"City": "Firozabad"},
	{"City": "Balfour"},
	{"City": "Albisola Superiore"},
	{"City": "Chulucanas"},
	{"City": "Curon Venosta/Graun im Vinschgau"},
	{"City": "Salvador"},
	{"City": "Lichfield"},
	{"City": "Wörgl"},
	{"City": "Casacalenda"},
	{"City": "Pievepelago"},
	{"City": "Shigar"}
];
