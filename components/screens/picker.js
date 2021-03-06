import React, {Component} from "react";
import {View, Text, Image, Dimensions, ImageBackground} from "react-native";
import {connect} from "react-redux";
import {GLView} from "expo";
import ExpoTHREE, { THREE } from "expo-three";
import TextMesh from "./textMesh";
import {GraphicsView} from 'expo-graphics';

import * as actions from "../../actions";
import styles from "../../styles/picker";
import {PRIMARY_COLOR} from "../../styles";
import history from "../../history";
import { Asset } from 'expo-asset';


import Button from "../widgets/button";


async function loadTextures(image){
    const cubeTexture = await ExpoTHREE.loadTextureAsync({ asset: require("../../assets/ktscube.png") });
    const spriteTexture = await ExpoTHREE.loadTextureAsync({ asset: require("../../assets/star.png") });

    return {
        cubeTexture,
        spriteTexture
    }
}

const {height, width} = Dimensions.get('window');

class NumberRain extends Component {

    constructor(){
        super();
        this.state = {
            x: 0,
            y: 0
        }
    }

    componentDidMount(){
        THREE.suppressExpoWarnings();
        
    }

  render() {
    return (
        
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        style={{width: "100%", height: "100%", position: "absolute", zIndex: 1}}
      />
    );
  }

  onContextCreate = async ({
    // Web: const gl = canvas.getContext('webgl')
    gl,
    width,
    height,
    scale,
  }) => {
    //AR.setPlaneDetection(AR.PlaneDetection.Horizontal);

    // Renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      width,
      height,
      pixelRatio: scale,
    });

    // Scene
    const {cubeTexture, spriteTexture} = await loadTextures(this.props.image);
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
    this.setState({
        y: 5
    });
    // Cube
    
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: cubeTexture
    });
    
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    
    // Light
    this.scene.add(new THREE.AmbientLight(0xffffff));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.9));
    this.camera.position.z = 5;
  };

  onRender = () => {
      const {x, y} = this.state;
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.cube.position.set(0, 1, 0);
      this.renderer.render(this.scene, this.camera);
  }; 
}

const Background = (props) => {
    const {children, image} = props;
    if(image == ""){
        return(
            <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
                {children}
            </View>
        )
    }
    return (
        <ImageBackground source={{uri: image}} style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
            {children}
        </ImageBackground>
    )
}

class PickerScreen extends Component {

    constructor(){
        super();
        this.state = {
            stars: [],
            animationLoop: null
        }
    }

    componentDidMount(){
        this.setState({
            animationLoop: requestAnimationFrame(this.animate)
        });
    }

    componentWillUnmount(){
       cancelAnimationFrame(this.state.animationLoop);
    }

    animate = () => {
        const {height, width} = Dimensions.get('window');
        const {stars} = this.state;
        const {speed} = this.props;
        let newStars = stars;
        newStars.map((s) => {
            let newStar = s;
            if(newStar.delay == 0 && !(newStar.winner && newStar.y > height/2 + newStar.size/2) && newStar.y < height + newStar.size){
                newStar.y += 10;
                if(speed == "fast"){
                    newStar.y += 10;
                }
            }else{
                newStar.delay -= 1;
            }
            if(newStar.y > height/2 && newStar.winner && newStar.size < 200){
                newStar.size += 5;
                if(speed == "fast"){
                    newStar.size += 5;
                }
            }
            return newStar;
        });
        this.setState({
            stars: newStars,
            animationLoop: requestAnimationFrame(this.animate)
        });
    }


    resartPicker = () => {
        this.props.clearStudent();
        history.push("/");
    }

    pickStudent = (student, students) => {
        let stars  = [];
        stars.push({
            student,
            winner: true,
            x: Math.floor(Math.random()*(width-100))+50,
            y: -80,
            size: 70,
            delay: Math.floor(Math.random()*120)
        });
        const prob = (5/students.length);
        students.forEach((s) => {
            if(Math.random() <= prob && stars.length < 5){
                let starX =  Math.floor(Math.random()*(width-40))+20;
                let delay = Math.floor(Math.random()*120);
                stars.push({
                    student: s,
                    winner: false,
                    x: Math.floor(Math.random()*(width-200))+100,
                    y: -80,
                    size: 70,
                    delay
                });
            }
        });
        this.setState({
            stars
        });
    }

    render(){
        const {pickStudent, students, student, clearPick, picked, image} = this.props;
        const {stars} = this.state;
        return(
            <View style={styles.container}>
                <Background image={image}>
                    <NumberRain students={students} clearPick={clearPick} picked={picked} image={image}/>

                    <View style={styles.starWorld}>
                        {   stars.map((s, i) => {
                                return(
                                    <View style={{position: "absolute", top: s.y-s.size/2, left: s.x-s.size/2, width: s.size, height: s.size, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} key={i}>
                                        <ImageBackground source={require("../../assets/gifticon.png")} style={{width: s.size, height: s.size, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{color: "white", fontSize: s.size*0.3}}>{s.student}</Text>
                                        </ImageBackground>
                                    </View>
                                );
                            })
                        }
                    </View>
                </Background>
                <View style={{zIndex: 999, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
                    {   (students.length == 0) ?
                        <View>
                            <Button content="Restart" onClick={this.resartPicker}/>
                        </View>
                        :
                        <View>
                            <Button content="Feeling Lucky?" onClick={() => pickStudent(students, this.pickStudent)}/>
                            <Button content="Restart" onClick={this.resartPicker} />
                        </View>
                    }
                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    const {students, student, picked, speed, image} = state.students;
    return{
        students,
        student,
        picked,
        speed,
        image
    }
}

export default connect(mapStateToProps, actions)(PickerScreen);