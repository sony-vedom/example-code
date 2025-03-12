import { Suspense, memo, useCallback, useMemo, useRef, useState } from "react";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { logger } from "shared/libs";
import { Model3dData } from "shared/models/Model3dData";
import { Vector3 } from "three";
import { OrbitControls as OrbitControlsClass } from "three-stdlib";
import { LoadingProgress } from "./LoadingProgress/LoadingProgress";
import { Model } from "./Model";
import styles from "./Model3dPreview.module.scss";
import { ToolPanel } from "./ToolPanel/ToolPanel";

type Props = {
    src: string | File | null;
    cameraTransform?: string;
    maxDistance?: number;
    className?: string;
    preview?: string;
    onLoaded?: (data: Model3dData) => void;
    children?: React.ReactNode;
};

export const Model3dPreview = memo(function Model3dPreview({
    className = "",
    src,
    preview,
    cameraTransform,
    maxDistance = 10,
    onLoaded,
    children,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const cameraControlsRef = useRef<OrbitControlsClass>(null);
    const aspect = useMemo(() => (ref.current ? ref.current.clientWidth / ref.current.clientHeight : 1), [ref.current]);
    const [transforming, setTransforming] = useState(false);
    const [legendShown, setLegendShown] = useState(false);
    const classNames = useMemo(
        () => `${styles.container} ${className} ${transforming ? styles.transform : ""}`,
        [transforming]
    );

    const onLoadedHandle = (data: Model3dData) => {
        onLoaded?.({ ...data, cameraControls: cameraControlsRef.current });
        cameraControlsRef.current.saveState();
    };

    const resetCamera = useCallback(() => {
        cameraControlsRef.current?.reset();
    }, [cameraControlsRef.current]);

    const handleShowModel = (isShow: boolean) => {
        setLegendShown(isShow);
    };
    const transform = useMemo(() => {
        let t = {
            position: new Vector3(0, 2.1, 1.4),
            target: new Vector3(0, 0, 0),
        };

        if (!cameraTransform) return t;
        try {
            const durtyTransform = JSON.parse(atob(cameraTransform));
            t = {
                position: new Vector3(durtyTransform.position.x, durtyTransform.position.y, durtyTransform.position.z),
                target: new Vector3(durtyTransform.target.x, durtyTransform.target.y, durtyTransform.target.z),
            };
        } catch (e) {
            logger.error(e);
        }
        return t;
    }, [cameraTransform]);

    return (
        <div
            ref={ref}
            className={classNames}
        >
            <ToolPanel
                onResetCamera={resetCamera}
                handleShowModel={(isShow) => handleShowModel(isShow)}
                legendShown={legendShown}
            >
                {children}
            </ToolPanel>

            <Canvas
                camera={{
                    position: transform.position,
                    aspect,
                    near: 0.1,
                    far: 100,
                }}
                flat={true}
                dpr={(Math.min(window.devicePixelRatio), 2)}
            >
                <Suspense fallback={<LoadingProgress preview={preview} />}>
                    <ambientLight />
                    <directionalLight intensity={3} />
                    <directionalLight
                        intensity={1}
                        position={[0, -10, -10]}
                    />
                    <Model
                        src={src}
                        onLoaded={onLoadedHandle}
                    />
                    <OrbitControls
                        ref={cameraControlsRef}
                        target={transform.target}
                        minDistance={1}
                        maxDistance={maxDistance}
                        onStart={() => setTransforming(true)}
                        onEnd={() => setTransforming(false)}
                    />
                    <PresentationControls />
                </Suspense>
            </Canvas>
        </div>
    );
});
