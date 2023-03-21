
import { useForm } from "react-hook-form";
import Particles from "react-particles";
import { useCallback } from 'react';
import { loadFull } from "tsparticles";
import { useLocation } from "wouter";



export default function LoginForm() {
    const [, setLocation] = useLocation();
    const {register,handleSubmit} = useForm();
    const onSubmit = (data) => {
        localStorage.setItem('nickname', data.nickname);
        setLocation("/chat")
    };
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("nickname")}  defaultValue="Никнейм" required/>
                <input type="submit" value="Потвердить"/>
            </form>
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
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
      );
    
}
