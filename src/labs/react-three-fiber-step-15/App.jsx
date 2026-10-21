import React, {Suspense, useState} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
class ErrorBoundary extends React.Component {state={error:null};static getDerivedStateFromError(error){return {error};}render(){return this.state.error?<p role="alert">{this.state.error.message}</p>:this.props.children;}}
function Model({url}){const gltf=useLoader(GLTFLoader,url);return <primitive object={gltf.scene}/>;}
export default function App(){const [url,setUrl]=useState('/model.glb');return <><button onClick={()=>setUrl(url==='/model.glb'?'/missing.glb':'/model.glb')}>Valid / missing GLB</button><ErrorBoundary key={url}><Suspense fallback={<p>Loading model…</p>}><Canvas camera={{position:[0,0,5]}}><ambientLight intensity={2}/><Model url={url}/></Canvas></Suspense></ErrorBoundary></>;}