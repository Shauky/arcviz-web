'use client';
import React from 'react';
import {
  ContactShadowGroundPlugin,
  GBufferPlugin,
  LoadingScreenPlugin,
  ProgressivePlugin,
  SSAAPlugin,
  SSAOPlugin,
  ThreeViewer,
  IObject3D,
} from 'threepipe';
import { TweakpaneUiPlugin } from '@threepipe/plugin-tweakpane';
import {
  BloomPlugin,
  DepthOfFieldPlugin,
  SSReflectionPlugin,
  TemporalAAPlugin,
} from '@threepipe/webgi-plugins';

export default function ThreeViewerComponent({
  src,
  env,
}: {
  src: string;
  env?: string;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const viewer = new ThreeViewer({
      // The canvas element where the scene will be rendered
      canvas: canvasRef.current,
      // Enable/Disable MSAA
      msaa: true,
      // Set the render scale automatically based on the device pixel ratio
      renderScale: 'auto',
      // Enable/Disable tone mapping
      tonemap: true,
      // Add some plugins
      plugins: [
        // Show a loading screen while the model is downloading
        LoadingScreenPlugin,
        // Enable progressive rendering and SSAA
        ProgressivePlugin,
        // Add post-processing plugins from threepipe and webgi.dev
        SSAAPlugin,
        GBufferPlugin,
        SSAOPlugin,
        TemporalAAPlugin,
        BloomPlugin,
        SSReflectionPlugin,
        DepthOfFieldPlugin,
        // Add a ground with contact shadows
        ContactShadowGroundPlugin,
      ],
    });
    viewer.scene.backgroundColor = null;

    const envPromise = env ? viewer.setEnvironmentMap(env) : null;
    const modelPromise = viewer.load<IObject3D>(src, {
      autoScale: true,
      autoCenter: true,
    });

    // Add a plugin with a debug UI for tweaking parameters
    const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

    // Add some debug UI elements for tweaking parameters
    ui.setupPlugins(SSAAPlugin);
    ui.setupPlugins(SSReflectionPlugin);
    ui.setupPlugins(BloomPlugin);
    ui.appendChild(viewer.scene.uiConfig, { expanded: true });

    // Wait for the files to load
    Promise.all([envPromise, modelPromise]).then(() => {
      // Override some settings from the file
      const ground = viewer.getPlugin(ContactShadowGroundPlugin);
      if (ground) {
        ground.material!.roughness = 0;
        ground.material!.metalness = 0;
      }
      // const bloom = viewer.getPlugin(BloomPlugin);
      // if (bloom) {
      //   bloom.pass!.threshold = 2;
      // }
      viewer.scene.envMapIntensity = 0.5; // Set the environment map intensity
      viewer.scene.backgroundColor = null; // set again because it was set once in the model
      viewer.scene.background = null; // set again because it was set once in the model
    });
    return () => {
      if (viewer) viewer.dispose();
    };
  }, [src, env]);

  return (
    <div>
      <canvas
        id="three-canvas"
        style={{
          width: '800px',
          height: '600px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          zIndex: '100',
        }}
        ref={canvasRef}
      />
    </div>
  );
}
