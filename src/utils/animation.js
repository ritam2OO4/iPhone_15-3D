import gsap from "gsap"

export const animateWithGsap = ({ target, animationProps, scrollProps }) => {
    console.log(target)
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart reverse restart reverse",
            start: 'top 85%',
            ...scrollProps,

        }
    })
}