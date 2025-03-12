import { memo, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Model3dData } from "shared/models/Model3dData";
type Props = {
    src: string | File | null;
    onLoaded?: (data: Model3dData) => void;
};

export const Model = memo(function Model({ src, onLoaded }: Props) {
    const url = typeof src === "string" ? src : URL.createObjectURL(src);
    const gltf = useGLTF(url, true, true);
    const data = useAnimations(gltf.animations, gltf.scene);

    useEffect(() => {
        onLoaded?.({
            gltf,
            animations: data
                ? {
                      mixer: data.mixer,
                      clips: data.clips,
                  }
                : null,
        });
    }, [gltf, data]);

    return (
        <group>
            <primitive object={gltf.scene} />
        </group>
    );
});
