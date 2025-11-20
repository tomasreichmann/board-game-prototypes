import { twMerge } from "tailwind-merge";
import Particles, { IParticlesProps } from "react-particles";
import { loadFull } from "tsparticles";
import { useState, useCallback, useEffect, useRef } from "react";
import { Container, Engine } from "tsparticles-engine";
import useMeasure from "react-use-measure";

export type EvaporationProps = {
    className?: string;
    style?: React.CSSProperties;
    duration?: number;
    disabled?: boolean;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};

const evaporationOptions: IParticlesProps["options"] = {
    fullScreen: {
        enable: false,
    },
    fpsLimit: 60,
    zLayers: 1,
    detectRetina: true,
    emitters: {
        direction: "top",
        life: {
            count: 10,
            duration: 0.1,
            delay: 0.1,
        },
        rate: {
            delay: 1,
            quantity: 10,
        },
        size: {
            width: 100,
            height: 0,
        },
        position: {
            y: 50,
            x: 50,
        },
    },

    particles: {
        rotate: {
            animation: {
                enable: true,
                speed: { min: 10, max: 20 },
            },
        },
        tilt: {
            enable: true,
            value: {
                min: 0,
                max: 360,
            },
            animation: {
                enable: true,
                speed: { min: 10, max: 20 },
            },
        },
        color: {
            value: "#4CA4F5",
            animation: {
                h: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    delay: 0,
                    decay: 1,
                    sync: true,
                },
                s: {
                    count: 0,
                    enable: true,
                    offset: 0,
                    speed: 5,
                    delay: 0,
                    decay: 0,
                    sync: true,
                },
                l: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    delay: 0,
                    decay: 0,
                    sync: true,
                },
            },
        },
        move: {
            angle: 10000000,
            direction: "top",
            enable: true,
            outModes: {
                default: "destroy",
            },
            gravity: {
                enable: true,
                acceleration: 10,
                inverse: true,
            },
            drift: { min: -0.1, max: 0.1 },
            random: true,
            speed: 1,
            straight: false,
            path: {
                enable: true,
                generator: "path",
            },
            warp: true,
        },
        number: {
            value: 0,
        },
        opacity: {
            value: 0.9,
            random: true,
            animation: {
                speed: 1,
                mode: "decrease",
                count: 100,
                enable: true,
            },
        },
        shadow: {
            blur: 10,
            color: {
                value: "#89C7FF",
            },
            enable: true,
            offset: {
                x: 0,
                y: 0,
            },
        },
        /*collisions: {
            enable: true,
            absorb: {
                speed: 2,
            },
            mode: "bounce",
            bounce: {
                horizontal: {
                    random: {
                        enable: false,
                        minimumValue: 0.1,
                    },
                    value: 1,
                },
                vertical: {
                    random: {
                        enable: false,
                        minimumValue: 0.1,
                    },
                    value: 1,
                },
            },
        },*/

        shape: {
            type: "polygon",
            polygon: {
                sides: 3,
                fill: true,
            },
        },

        size: {
            value: { min: 3, max: 5 },
            animation: {
                enable: true,
                speed: { min: 30, max: 50 },
                delay: 1,
                mode: "decrease",
                destroy: "min",
            },
            random: true,
        },
    },
};

export default function Evaporation({
    className,
    style = {},
    top = -400,
    bottom = 0,
    left = -50,
    right = -50,
    duration = 10000,
    disabled,
}: EvaporationProps) {
    const [particlesContainer, setParticlesContainer] = useState<Container | undefined>(undefined);
    const [ref, bounds] = useMeasure();
    const particlesInit = useCallback(async (engine: Engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await container;
            setParticlesContainer(container);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [bounds.width, bounds.height, disabled]
    );

    const firstRenderTime = useRef(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!disabled && particlesContainer && bounds.width > 0 && bounds.height > 0) {
            const xScale = particlesContainer.canvas.size.width / bounds.width;
            interval = setInterval(() => {
                const elapsedTime = Math.min(Date.now() - firstRenderTime.current, duration);
                const completeness = elapsedTime / duration;
                const chanceForParticle = 1 - completeness * completeness;
                if (Math.random() < chanceForParticle) {
                    particlesContainer.particles.addParticle({
                        x: -left + (bounds.width + left + right) * Math.random() * xScale,
                        y: particlesContainer.canvas.size.height - 10 - 30 * Math.random(),
                    });
                }
                if (firstRenderTime.current === 0) {
                    firstRenderTime.current = Date.now();
                }
                if (elapsedTime >= duration) {
                    clearInterval(interval);
                }
            }, 10);
        }
        return () => {
            clearInterval(interval);
        };
    }, [particlesContainer, bounds.width, bounds.height, disabled]);

    return (
        <div className={twMerge("Evaporation", className)} style={{ ...style, top, bottom, left, right }} ref={ref}>
            <Particles
                className="relative w-full h-full"
                id="evaporation"
                options={evaporationOptions}
                init={particlesInit}
                loaded={particlesLoaded as any}
            />
        </div>
    );
}
