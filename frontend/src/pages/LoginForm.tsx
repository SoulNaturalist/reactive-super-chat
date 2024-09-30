import { useForm, SubmitHandler } from "react-hook-form";
import Particles from "react-particles";
import { useCallback } from 'react';
import { loadFull } from "tsparticles";
import { useLocation } from "wouter";
import { Engine } from "tsparticles-engine";
import React from "react";

export default function LoginForm() {
    const checkExistUser = () => {
        const nickname = localStorage.getItem("nickname");
        if (nickname !== null && nickname.length > 0) {
            setLocation("/chat");
            return false;
        }
        return true;
    };

    const [, setLocation] = useLocation();
    const { register, handleSubmit } = useForm<FormValues>();
    type FormValues = {
        nickname: string;
    };
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const nickname = data.nickname;
        localStorage.setItem("nickname", nickname);
        setLocation("/chat");
    };
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    const progressBar = checkExistUser();

    return (
        <>
            {progressBar ? (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("nickname")} defaultValue="Никнейм" required />
                        <input type="submit" value="Подтвердить" />
                    </form>
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        options={{
                            fpsLimit: 120,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: "push",
                                    },
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    push: {
                                        quantity: 4,
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value: "#ffffff",
                                },
                                links: {
                                    color: "#ffffff",
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.5,
                                    width: 3,
                                },
                                collisions: {
                                    enable: true,
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    random: true,
                                    speed: 3,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 800,
                                    },
                                    value: 100,
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                shape: {
                                    type: "circle",
                                },
                                size: {
                                    value: { min: 4, max: 5 },
                                },
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </>
    );
}
