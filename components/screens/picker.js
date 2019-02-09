import React, {Component} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {connect} from "react-redux";
import {GLView} from "expo";
import ExpoTHREE, { THREE } from "expo-three";
import TextMesh from "./textMesh";
import {GraphicsView} from 'expo-graphics';

import * as actions from "../../actions";
import styles from "../../styles/picker";
import history from "../../history";

import Button from "../widgets/button";


async function loadTextures(){
    const cubeTexture = await ExpoTHREE.loadTextureAsync({ asset: require("../../assets/ktscube.png") });
    const spriteTexture = await ExpoTHREE.loadTextureAsync({ asset: require("../../assets/star.png") });
    //const avenirFont = await ExpoTHREE.loadAsync(require("../../assets/avenirmedium.json"));
    return {
        cubeTexture,
        spriteTexture
    }
}

//const {height, width} = Dimensions.get('window');

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
        style={{width: "100%", height: "100%", position: "absolute", zIndex: -100}}
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
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    //this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    // Camera
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
    this.setState({
        y: 5
    });
    // Cube
    const {cubeTexture, spriteTexture} = await loadTextures();
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: cubeTexture
    });
    
    this.sprites = [];
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    //Text
    
    // Light
    this.scene.add(new THREE.AmbientLight(0xffffff));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.9));
    this.camera.position.z = 5;
  };


  startPickAnimation = async () => {
    const {spriteTexture} = await loadTextures();
    this.sprites = [];
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteTexture, color: 0xffffff } );
    const winner = new THREE.Sprite( spriteMaterial );
    const xWinner = Math.random()*2.5-1.25;
    winner.scale.set(0.3,0.3,0.3);
    winner.position.set(xWinner, 0, 2);
    const winnerTextMesh = new TextMesh();
    winnerTextMesh.material = new THREE.MeshPhongMaterial({ color: 0x056ecf });
    winnerTextMesh.update({
        text: this.props.student,
        font: require("../../assets/avenirmedium.json"),
        size: 30, //Size of the text. Default is 100.
        height: 5, //Thickness to extrude text. Default is 50.
        curveSegments: 12, // — Integer. Number of points on the curves. Default is 12.
        bevelEnabled: false, // — Boolean. Turn on bevel. Default is False.
        bevelThickness: 1, // — Float. How deep into text bevel goes. Default is 10.
        bevelSize: 0.8, // — Float. How far from text outline is bevel. Default is 8.
        bevelSegments: 0.3,
    });
    ExpoTHREE.utils.scaleLongestSideToSize(winnerTextMesh, 5);
    ExpoTHREE.utils.alignMesh(winnerTextMesh, { y: 5, x: xWinner, z: -100 });
    const winnerState = {
        winner: true,
    }
    const winnerObject = {
        student: this.props.student,
        sprite: winner,
        state: winnerState,
        textMesh: winnerTextMesh
    }
    this.scene.add(winner);
    this.sprites.push(winnerObject);
    const losers = this.props.students.length < 5 ? this.props.students.length : 5;
    
    for(let i = 0; i < losers; i++){
        const sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.3,0.3,0.3);
        const xPos = Math.random()*2.5-1.25;
        sprite.position.set(xPos, 0, 2);
        const state = {
            winner: false,
        }
        const textMesh = new TextMesh();
        textMesh.material = new THREE.MeshPhongMaterial({ color: 0x056ecf });
        textMesh.update({
            text: this.props.students[i],
            font: require("../../assets/avenirmedium.json"),
            size: 30, //Size of the text. Default is 100.
            height: 5, //Thickness to extrude text. Default is 50.
            curveSegments: 12, // — Integer. Number of points on the curves. Default is 12.
            bevelEnabled: false, // — Boolean. Turn on bevel. Default is False.
            bevelThickness: 1, // — Float. How deep into text bevel goes. Default is 10.
            bevelSize: 0.8, // — Float. How far from text outline is bevel. Default is 8.
            bevelSegments: 0.3,
        });
        ExpoTHREE.utils.scaleLongestSideToSize(textMesh, 5);
        ExpoTHREE.utils.alignMesh(textMesh, { y: -1, x: xPos, z: -50 });
        const spriteObject = {
            student: this.props.students[i],
            sprite,
            state,
            textMesh
        }
        this.scene.add(sprite);
        this.scene.add(textMesh);
        this.sprites.push(spriteObject);
    }
  }

  onRender = () => {
      if(this.props.picked){
        this.startPickAnimation();
        this.props.clearPick();
      }
      const {x, y} = this.state;
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      if(y < 0){
          this.setState({
              y: 5
          });
          this.sprites.filter((s) => !s.winner).forEach((s) => {
            this.scene.remove(s.sprite);
            this.scene.remove(s.textMesh);
          });
          this.sprites = [];
      }else{
        this.setState({
            x: x,
            y: y-0.02
        });
      }
      this.cube.position.set(0, 1, 0);
      this.sprites.forEach(({sprite}) => {
        sprite.position.set(sprite.position.x, y, 2);
      });
      this.renderer.render(this.scene, this.camera);
  }; 
}

class PickerScreen extends Component {


    resartPicker = () => {
        this.props.clearStudent();
        history.push("/");
    }

    render(){
        const {pickStudent, students, student, clearPick, picked} = this.props;
        return(
            <View style={styles.container}>
                <NumberRain students={students} clearPick={clearPick} picked={picked}/>
                {   (student && students.length > 0) &&
                    <View>
                        <Text style={styles.student}>Student</Text>
                        <Text style={styles.student}>{student.toString()}</Text>
                    </View>
                }
                {   (!student && students.length > 0) &&
                    <View>
                        <Text style={styles.student}>Are you the lucky one?</Text>
                    </View>
                }
                {   (students.length == 0) ?
                    <View>
                        <Text style={styles.student}>Student</Text>
                        <Text style={styles.student}>{student.toString()}</Text>
                        <Button content="Restart" onClick={this.resartPicker}/>
                    </View>
                    :
                    <View>
                        <Button content="Feeling Lucky?" onClick={() => pickStudent(students)}/>
                        <Button content="Restart" onClick={this.resartPicker} />
                    </View>
                }
            </View>
        );
    }
}

function mapStateToProps(state){
    const {students, student, picked} = state.students;
    return{
        students,
        student,
        picked
    }
}

export default connect(mapStateToProps, actions)(PickerScreen);