import gsap from "gsap";

const tl = gsap.timeline({ paused: true, reversed: true });

export const useAnimations = () => {
    const onEnter = () => {
        tl.play();
        tl.from(".container .icon-wrapper", {
            scale: 0,
        })
            .from(
                ".container .title",
                {
                    scale: 0,
                },
                0.2
            )
            .from(
                ".card",
                {
                    ease: "elastic.easeIn.config(1, 0.6)",
                    scale: 0,
                },
                0.4
            )

            .to(
                ".checkbox-wrappper label",
                {
                    transform: "translateX(0)",
                    stagger: 0.1,
                },
                "-=0.1"
            )
            .from(
                ".size-wrapper",
                {
                    x: 600,
                },
                0.6
            )
            .from(
                ".input-wrapper",
                {
                    scale: 0,
                },
                0.5
            )
            .from(
                ".button-wrapper",
                {
                    scale: 0,
                },
                0.8
            );
    };

    return { onEnter };
};
