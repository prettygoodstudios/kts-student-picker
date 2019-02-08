import React, {Component} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {connect} from "react-redux";
import {GLView} from "expo";
import ExpoTHREE, { THREE } from "expo-three";
import {GraphicsView} from 'expo-graphics';

import * as actions from "../../actions";
import styles from "../../styles/picker";
import history from "../../history";

import Button from "../widgets/button";


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

  onContextCreate = ({
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
    //this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    // Camera
    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
    this.setState({
        y: 5
    });

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xE5344F,
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
      if(y < -5){
          this.setState({
              y: 5
          });
      }else{
        this.setState({
            x: x,
            y: y-0.02
        });
      }
      this.cube.position.set(x, y, 0);
      this.renderer.render(this.scene, this.camera);
  }; 
}

class PickerScreen extends Component {


    resartPicker = () => {
        this.props.clearStudent();
        history.push("/");
    }

    render(){
        const {pickStudent, students, student} = this.props;
        return(
            <View style={styles.container}>
                <Image source={require("../../assets/ktslogo.png")}/>
                <NumberRain/>
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
    const {students, student} = state.students;
    return{
        students,
        student
    }
}

export default connect(mapStateToProps, actions)(PickerScreen);